###################
Server 需求
###################

`PHP <http://www.php.net/>`_ 版本 5.6 或者更高版本。

It should work on 5.3.7 as well, but we strongly advise you NOT to run
such old versions of PHP, because of potential security and performance
issues, as well as missing features.

大多網站數應用程式是需要資料庫的。

 現在支持的資料庫:
  - MySQL (5.1+) via the *mysql* (棄用), *mysqli* and *pdo* drivers
  - Oracle via the *oci8* and *pdo* drivers
  - PostgreSQL via the *postgre* and *pdo* drivers
  - MS SQL via the *mssql*, *sqlsrv* (version 2005 and above only) and *pdo* drivers
  - SQLite via the *sqlite* (version 2), *sqlite3* (version 3) and *pdo* drivers
  - CUBRID via the *cubrid* and *pdo* drivers
  - Interbase/Firebird via the *ibase* and *pdo* drivers
  - ODBC via the *odbc* and *pdo* drivers (you should know that ODBC is actually an abstraction layer)
