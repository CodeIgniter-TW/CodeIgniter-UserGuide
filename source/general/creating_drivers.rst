################
自建驅動器
################

Driver 目錄和檔案架構
===================================

底下是簡單 driver 目錄和檔案架構設計:

-  /application/libraries/Driver_name

   -  Driver_name.php
   -  drivers

      -  Driver_name_subclass_1.php
      -  Driver_name_subclass_2.php
      -  Driver_name_subclass_3.php

.. note:: 為了維護相容於具有大小寫相依的檔案系統，Driver_name 目錄名稱第一個字母必須為大寫 ``ucfirst()``。

.. note:: 驅動器類別的架構是無法 extends 的，所以它不會繼承主驅動器類別的變數以及方法。
