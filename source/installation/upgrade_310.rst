#####################
從 3.0.6 升級到 3.1.0
#####################

在執行升級之前，你應該更換 index.php 為靜態檔案，將網站導向此靜態網頁。

步驟 1：更新網站 CodeIgniter 檔案
=================================

取代 *system/* 目錄打下的所有目錄與檔案

.. 注意:: 假如您有修改此目錄底下的檔案，麻煩請先複製備份。

步驟 2: 檢查你的 PHP 版本
=========================

We recommend always running versions that are `currently supported
<https://secure.php.net/supported-versions.php>`_, which right now is at least PHP 5.6.

PHP 5.2.x versions are now officially not supported by CodeIgniter, and while 5.3.7+
may be at least runnable, we strongly discourage you from using any PHP versions below
the ones listed on the `PHP.net Supported Versions <https://secure.php.net/supported-versions.php>`_
page.

步驟 3: If you're using the 'odbc' database driver, check for usage of Query Builder
====================================================================================

:doc:`Query Builder <../database/query_builder>` functionality and ``escape()`` can
no longer be used with the 'odbc' database driver.

This is because, due to its nature, the `ODBC extension for PHP <https://secure.php.net/odbc>`_
does not provide a function that allows to safely escape user-supplied strings for usage
inside an SQL query (which our :doc:`Query Builder <../database/query_builder>` relies on).

Thus, user inputs MUST be bound, as shown in :doc:`Running Queries <../database/queries>`,
under the "Query Bindings" section.
