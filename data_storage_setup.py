# data_storage_setup.py
"""
Data Storage Module for Fraud Detection Project
Implements local file-based storage with SQLite for quick querying

Enhanced with:
- Error handling for robust operations
- Helper methods for better query interface
"""

import pandas as pd
import sqlite3
import os
from pathlib import Path
import hashlib
import json
from datetime import datetime


class DataStorageManager:
    """
    Manages data storage for the fraud detection project.
    
    For portfolio demonstration: Uses local SQLite database.
    Production enhancement: Would use cloud-based solutions (see documentation).
    """
    
    def __init__(self, project_root='./fraud_detection_project'):
        """
        Initialize storage manager with directory structure.
        
        Args:
            project_root: Root directory for the project
            
        Directory structure:
            fraud_detection_project/
            ├── data/
            │   ├── raw/              # Original, immutable data
            │   ├── processed/        # Cleaned, transformed data
            │   ├── features/         # Engineered features
            │   └── predictions/      # Model predictions
            ├── database/
            │   └── fraud_detection.db  # SQLite database
            └── metadata/
                └── data_registry.json  # Data versioning info
        """
        self.project_root = Path(project_root)
        self._create_directory_structure()
        self.db_path = self.project_root / 'database' / 'fraud_detection.db'
        
    def _create_directory_structure(self):
        """Create necessary directories if they don't exist."""
        directories = [
            'data/raw',
            'data/processed',
            'data/features',
            'data/predictions',
            'database',
            'metadata'
        ]
        
        try:
            for directory in directories:
                (self.project_root / directory).mkdir(parents=True, exist_ok=True)
            
            print(f"✓ Directory structure created at: {self.project_root}")
        except Exception as e:
            print(f"❌ Error creating directory structure: {str(e)}")
            raise
    
    def load_raw_data(self, csv_path, dataset_name='creditcard'):
        """
        Load raw CSV data and store in both file system and SQLite.
        
        Args:
            csv_path: Path to the raw CSV file
            dataset_name: Name identifier for the dataset
            
        Returns:
            pd.DataFrame: Loaded dataframe
            
        Raises:
            FileNotFoundError: If CSV file doesn't exist
            ValueError: If required columns are missing
            Exception: For other data loading errors
            
        Why this matters:
            - Raw data is preserved immutably
            - SQLite enables SQL queries for EDA
            - Metadata tracking enables reproducibility
        """
        try:
            print(f"Loading data from: {csv_path}")
            
            # Validate file exists
            csv_path_obj = Path(csv_path)
            if not csv_path_obj.exists():
                raise FileNotFoundError(f"CSV file not found: {csv_path}")
            
            # Load CSV
            df = pd.read_csv(csv_path)
            
            if df.empty:
                raise ValueError("CSV file is empty")
            
            # Validate expected columns for fraud detection dataset
            expected_cols = ['Time', 'Amount', 'Class']
            missing_cols = [col for col in expected_cols if col not in df.columns]
            if missing_cols:
                raise ValueError(f"Missing required columns: {missing_cols}")
            
            print(f"✓ Data loaded: {len(df):,} rows, {len(df.columns)} columns")
            
            # Calculate hash for data versioning
            data_hash = self._calculate_data_hash(df)
            
            # Save to raw directory
            raw_output_path = self.project_root / 'data' / 'raw' / f'{dataset_name}.csv'
            df.to_csv(raw_output_path, index=False)
            print(f"✓ Raw data saved to: {raw_output_path}")
            
            # Save to SQLite
            self._save_to_sqlite(df, table_name='raw_transactions')
            
            # Record metadata
            self._record_metadata(
                dataset_name=dataset_name,
                data_hash=data_hash,
                row_count=len(df),
                column_count=len(df.columns),
                file_path=str(raw_output_path)
            )
            
            print(f"✓ Fraud rate: {df['Class'].mean()*100:.3f}%")
            
            return df
            
        except FileNotFoundError as e:
            print(f"❌ File Error: {str(e)}")
            raise
        except ValueError as e:
            print(f"❌ Validation Error: {str(e)}")
            raise
        except Exception as e:
            print(f"❌ Unexpected error loading data: {str(e)}")
            raise
    
    def _save_to_sqlite(self, df, table_name):
        """
        Save dataframe to SQLite database.
        
        Why SQLite for portfolio:
            - No server setup required (single file database)
            - Demonstrates SQL knowledge
            - Enables efficient querying without loading full CSV
            - Industry-standard for local development
        """
        try:
            conn = sqlite3.connect(self.db_path)
            
            # Save data
            df.to_sql(table_name, conn, if_exists='replace', index=False)
            
            # Create indexes for faster queries (production best practice)
            if table_name == 'raw_transactions':
                cursor = conn.cursor()
                cursor.execute('CREATE INDEX IF NOT EXISTS idx_class ON raw_transactions(Class)')
                cursor.execute('CREATE INDEX IF NOT EXISTS idx_time ON raw_transactions(Time)')
                cursor.execute('CREATE INDEX IF NOT EXISTS idx_amount ON raw_transactions(Amount)')
                conn.commit()
            
            conn.close()
            print(f"✓ Data saved to SQLite table: {table_name}")
            
        except sqlite3.Error as e:
            print(f"❌ Database Error: {str(e)}")
            raise
        except Exception as e:
            print(f"❌ Error saving to SQLite: {str(e)}")
            raise
    
    def query_data(self, sql_query):
        """
        Execute SQL query on the database.
        
        Args:
            sql_query: SQL query string
            
        Returns:
            pd.DataFrame: Query results
            
        Example queries:
            - "SELECT * FROM raw_transactions WHERE Class = 1 LIMIT 10"
            - "SELECT COUNT(*) as fraud_count FROM raw_transactions WHERE Class = 1"
            - "SELECT AVG(Amount) FROM raw_transactions GROUP BY Class"
        """
        try:
            conn = sqlite3.connect(self.db_path)
            df = pd.read_sql_query(sql_query, conn)
            conn.close()
            return df
        except sqlite3.Error as e:
            print(f"❌ SQL Query Error: {str(e)}")
            print(f"Query: {sql_query}")
            raise
        except Exception as e:
            print(f"❌ Error executing query: {str(e)}")
            raise
    
    # ========== HELPER METHODS FOR BETTER QUERY INTERFACE ==========
    
    def get_fraud_transactions(self, limit=None):
        """
        Convenience method to get fraud transactions.
        
        Args:
            limit: Maximum number of rows to return (None = all)
            
        Returns:
            pd.DataFrame: Fraud transactions
        """
        try:
            query = "SELECT * FROM raw_transactions WHERE Class = 1"
            if limit:
                query += f" LIMIT {limit}"
            return self.query_data(query)
        except Exception as e:
            print(f"❌ Error retrieving fraud transactions: {str(e)}")
            raise
    
    def get_legitimate_transactions(self, limit=None):
        """
        Convenience method to get legitimate transactions.
        
        Args:
            limit: Maximum number of rows to return (None = all)
            
        Returns:
            pd.DataFrame: Legitimate transactions
        """
        try:
            query = "SELECT * FROM raw_transactions WHERE Class = 0"
            if limit:
                query += f" LIMIT {limit}"
            return self.query_data(query)
        except Exception as e:
            print(f"❌ Error retrieving legitimate transactions: {str(e)}")
            raise
    
    def get_fraud_statistics(self):
        """
        Get fraud vs legitimate transaction statistics.
        
        Returns:
            pd.DataFrame: Statistics by class (fraud vs legitimate)
        """
        try:
            return self.query_data("""
                SELECT 
                    Class,
                    COUNT(*) as count,
                    ROUND(AVG(Amount), 2) as avg_amount,
                    ROUND(MIN(Amount), 2) as min_amount,
                    ROUND(MAX(Amount), 2) as max_amount
                FROM raw_transactions
                GROUP BY Class
            """)
        except Exception as e:
            print(f"❌ Error retrieving fraud statistics: {str(e)}")
            raise
    
    def get_transaction_count(self):
        """
        Get total transaction count by class.
        
        Returns:
            dict: {'total': int, 'fraud': int, 'legitimate': int, 'fraud_rate': float}
        """
        try:
            result = self.query_data("""
                SELECT 
                    COUNT(*) as total,
                    SUM(CASE WHEN Class = 1 THEN 1 ELSE 0 END) as fraud,
                    SUM(CASE WHEN Class = 0 THEN 1 ELSE 0 END) as legitimate
                FROM raw_transactions
            """)
            
            total = int(result['total'].iloc[0])
            fraud = int(result['fraud'].iloc[0])
            legitimate = int(result['legitimate'].iloc[0])
            fraud_rate = (fraud / total * 100) if total > 0 else 0
            
            return {
                'total': total,
                'fraud': fraud,
                'legitimate': legitimate,
                'fraud_rate': round(fraud_rate, 3)
            }
        except Exception as e:
            print(f"❌ Error getting transaction count: {str(e)}")
            raise
    
    def get_high_value_transactions(self, amount_threshold=1000, limit=None):
        """
        Get transactions above a certain amount threshold.
        
        Args:
            amount_threshold: Minimum transaction amount
            limit: Maximum number of rows to return (None = all)
            
        Returns:
            pd.DataFrame: High-value transactions
        """
        try:
            query = f"SELECT * FROM raw_transactions WHERE Amount >= {amount_threshold} ORDER BY Amount DESC"
            if limit:
                query += f" LIMIT {limit}"
            return self.query_data(query)
        except Exception as e:
            print(f"❌ Error retrieving high-value transactions: {str(e)}")
            raise
    
    def get_transactions_by_time_range(self, start_time, end_time):
        """
        Get transactions within a specific time range.
        
        Args:
            start_time: Start time (seconds from first transaction)
            end_time: End time (seconds from first transaction)
            
        Returns:
            pd.DataFrame: Transactions in time range
        """
        try:
            return self.query_data(f"""
                SELECT * FROM raw_transactions 
                WHERE Time >= {start_time} AND Time <= {end_time}
                ORDER BY Time
            """)
        except Exception as e:
            print(f"❌ Error retrieving transactions by time range: {str(e)}")
            raise
    
    # ========== END HELPER METHODS ==========
    
    def _calculate_data_hash(self, df):
        """
        Calculate hash of dataframe for versioning.
        
        Why this matters:
            - Ensures data integrity
            - Enables reproducibility
            - Detects accidental data modifications
        """
        try:
            # Create hash from dataframe values
            data_string = pd.util.hash_pandas_object(df).values.tobytes()
            return hashlib.sha256(data_string).hexdigest()
        except Exception as e:
            print(f"⚠️ Warning: Could not calculate data hash: {str(e)}")
            return "hash_unavailable"
    
    def _record_metadata(self, **kwargs):
        """
        Record metadata about the dataset.
        
        Metadata includes:
            - Dataset name and version
            - Data hash (for integrity checking)
            - Row/column counts
            - Timestamp
            - File paths
        """
        try:
            metadata_path = self.project_root / 'metadata' / 'data_registry.json'
            
            # Load existing metadata if it exists
            if metadata_path.exists():
                with open(metadata_path, 'r') as f:
                    registry = json.load(f)
            else:
                registry = {'datasets': []}
            
            # Add new entry
            entry = {
                'timestamp': datetime.now().isoformat(),
                **kwargs
            }
            registry['datasets'].append(entry)
            
            # Save updated registry
            with open(metadata_path, 'w') as f:
                json.dump(registry, f, indent=2)
            
            print(f"✓ Metadata recorded")
            
        except Exception as e:
            print(f"⚠️ Warning: Could not record metadata: {str(e)}")
            # Don't raise - metadata recording failure shouldn't stop the pipeline
    
    def save_processed_data(self, df, stage_name):
        """
        Save processed/transformed data.
        
        Args:
            df: Processed dataframe
            stage_name: Processing stage (e.g., 'cleaned', 'engineered', 'scaled')
            
        Returns:
            Path: Output file path
            
        Why multiple stages:
            - Enables debugging (check output at each stage)
            - Saves computation (don't reprocess from scratch)
            - Portfolio demonstration (shows systematic pipeline)
        """
        try:
            output_path = self.project_root / 'data' / 'processed' / f'{stage_name}.csv'
            df.to_csv(output_path, index=False)
            
            # Also save to SQLite with descriptive table name
            self._save_to_sqlite(df, table_name=f'processed_{stage_name}')
            
            print(f"✓ Processed data saved: {stage_name}")
            return output_path
            
        except Exception as e:
            print(f"❌ Error saving processed data: {str(e)}")
            raise
    
    def get_data_summary(self):
        """
        Get summary statistics about stored data.
        
        Returns comprehensive overview for portfolio documentation.
        """
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            # Get list of tables
            cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
            tables = cursor.fetchall()
            
            summary = {
                'database_path': str(self.db_path),
                'tables': {}
            }
            
            for table in tables:
                table_name = table[0]
                cursor.execute(f"SELECT COUNT(*) FROM {table_name}")
                row_count = cursor.fetchone()[0]
                summary['tables'][table_name] = {'row_count': row_count}
            
            conn.close()
            
            return summary
            
        except Exception as e:
            print(f"❌ Error getting data summary: {str(e)}")
            raise


# Example usage script
def main():
    """
    Example implementation for portfolio project.
    """
    print("="*60)
    print("FRAUD DETECTION PROJECT - DATA STORAGE SETUP")
    print("="*60)
    
    # Initialize storage manager
    storage = DataStorageManager(project_root='./fraud_detection_project')
    
    # Load raw data (adjust path to your downloaded CSV)
    df = storage.load_raw_data(
        csv_path='/Users/gloriarusenova/Documents/Fraud Detection docs /creditcard.csv',
        dataset_name='creditcard_fraud_2013'
    )
    
    # Example: Get transaction counts using helper method
    print("\n" + "="*60)
    print("TRANSACTION COUNTS (Using Helper Method)")
    print("="*60)
    counts = storage.get_transaction_count()
    print(f"Total transactions: {counts['total']:,}")
    print(f"Fraud transactions: {counts['fraud']:,}")
    print(f"Legitimate transactions: {counts['legitimate']:,}")
    print(f"Fraud rate: {counts['fraud_rate']}%")
    
    # Example: Get fraud transactions using helper method
    print("\n" + "="*60)
    print("FRAUD TRANSACTIONS SAMPLE (Using Helper Method)")
    print("="*60)
    fraud_sample = storage.get_fraud_transactions(limit=5)
    print(fraud_sample[['Time', 'Amount', 'Class']])
    
    # Example: Get fraud statistics using helper method
    print("\n" + "="*60)
    print("FRAUD STATISTICS (Using Helper Method)")
    print("="*60)
    stats = storage.get_fraud_statistics()
    print(stats)
    
    # Example: Get high-value transactions
    print("\n" + "="*60)
    print("HIGH-VALUE TRANSACTIONS (>$1000)")
    print("="*60)
    high_value = storage.get_high_value_transactions(amount_threshold=1000, limit=5)
    print(f"Found {len(high_value)} high-value transactions")
    if len(high_value) > 0:
        print(high_value[['Time', 'Amount', 'Class']])
    
    # Get summary
    print("\n" + "="*60)
    print("DATA STORAGE SUMMARY")
    print("="*60)
    summary = storage.get_data_summary()
    print(json.dumps(summary, indent=2))
    
    print("\n✓ Data storage setup complete!")
    print(f"✓ Database location: {storage.db_path}")


if __name__ == "__main__":
    main()

