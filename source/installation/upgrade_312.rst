#####################
從 3.1.1 升級到 3.1.2
#####################

在執行升級之前，你應該更換 index.php 為靜態檔案，將網站導向此靜態網頁。

步驟 1：更新網站 CodeIgniter 檔案
=================================

取代 *system/* 目錄打下的所有目錄與檔案

.. 提醒:: 假如您有修改此目錄底下的檔案，麻煩請先複製備份。

步驟 2: 更新 "ci_sessions" 資料表
=================================

If you're using the :doc:`Session Library </libraries/sessions>` with the
'database' driver, you may have to ``ALTER`` your sessions table for your
sessions to continue to work.

.. note:: The table in question is not necessarily named "ci_sessions".
	It is what you've set as your ``$config['sess_save_path']``.

This will only affect you if you've changed your ``session.hash_function``
*php.ini* setting to something like 'sha512'. Or if you've been running
an older CodeIgniter version on PHP 7.1+.

It is recommended that you do this anyway, just to avoid potential issues
in the future if you do change your configuration.

Just execute the one of the following SQL queries, depending on your
database::

	// MySQL:
	ALTER TABLE ci_sessions CHANGE id id varchar(128) NOT NULL;

	// PostgreSQL
	ALTER TABLE ci_sessions ALTER COLUMN id SET DATA TYPE varchar(128);
