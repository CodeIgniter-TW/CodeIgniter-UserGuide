#####################
從 3.1.5 升級到 3.1.6
#####################

在執行升級之前，你應該更換 index.php 為靜態檔案，將網站導向此靜態網頁。

步驟 1：更新網站 CodeIgniter 檔案
=================================

取代 *system/* 目錄打下的所有目錄與檔案

.. 提醒:: 假如您有修改此目錄底下的檔案，麻煩請先複製備份。

步驟 2: Remove usage of the APC Cache driver (deprecation)
==========================================================

The :doc:`Cache Library <../libraries/caching>` APC driver is now
deprecated, as the APC extension is effectively dead, as explained in its
`PHP Manual page <https://secure.php.net/manual/en/intro.apc.php>`_.

If your application happens to be using it, you can switch to another
cache driver, as APC support will be removed in a future CodeIgniter
version.

.. 提醒:: The driver is still available, but you're strongly encouraged
	to remove its usage sooner rather than later.
