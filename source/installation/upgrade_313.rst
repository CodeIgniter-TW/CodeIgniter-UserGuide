#####################
從 3.1.2 升級到 3.1.3
#####################

在執行升級之前，你應該更換 index.php 為靜態檔案，將網站導向此靜態網頁。

步驟 1：更新網站 CodeIgniter 檔案
=================================

取代 *system/* 目錄打下的所有目錄與檔案

.. 提醒:: 假如您有修改此目錄底下的檔案，麻煩請先複製備份。

步驟 2: 移除輔助函式 nice_date() 的使用 (deprecation)
=====================================================

The :doc:`Date Helper <../helpers/date_helper>` function ``nice_date()`` is
no longer useful since the introduction of PHP's `DateTime classes
<https://secure.php.net/datetime>`_

You can replace it with the following:
::

	DateTime::createFromFormat($input_format, $input_date)->format($desired_output_format);

Thus, ``nice_date()`` is now deprecated and scheduled for removal in
CodeIgniter 3.2+.

.. 提醒:: The function is still available, but you're strongly encouraged
	to remove its usage sooner rather than later.

步驟 3: 移除 $config['standardize_newlines'] 的使用
===================================================

The :doc:`Input Library <../libraries/input>` would optionally replace
occurrences of `\r\n`, `\r`, `\n` in input data with whatever the ``PHP_EOL``
value is on your system - if you've set ``$config['standardize_newlines']``
to ``TRUE`` in your *application/config/config.php*.

This functionality is now deprecated and scheduled for removal in
CodeIgniter 3.2.+.

.. 提醒:: The functionality is still available, but you're strongly
	encouraged to remove its usage sooner rather than later.
