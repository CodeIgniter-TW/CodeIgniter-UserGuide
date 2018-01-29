#####################
從 3.1.6 升級到 3.1.7
#####################

在執行升級之前，你應該更換 index.php 為靜態檔案，將網站導向此靜態網頁。

步驟 1：更新網站 CodeIgniter 檔案
=================================

取代 *system/* 目錄打下的所有目錄與檔案

.. 提醒:: 假如您有修改此目錄底下的檔案，麻煩請先複製備份。

步驟 2：Remove usage of CAPTCHA helper extra parameters (deprecation)
=====================================================================

The :doc:`CAPTCHA Helper <../helpers/captcha_helper>` function
:php:func:`create_captcha()` allows passing of its ``img_path``, ``img_url``
and ``font_path`` options as the 2nd, 3rd and 4th parameters respectively.

This kind of usage is now deprecated and you should just pass the options
in question as part of the first parameter array.

.. 提醒:: The functionality in question is still available, but you're
	strongly encouraged to remove its usage sooner rather than later.
