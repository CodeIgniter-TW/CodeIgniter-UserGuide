######################
應用程式溝通流程
######################

根據圖片指示，來了解資料在系統中是如何跑的:

|CodeIgniter application flow|

#. index.php 檔案是最一開始的 controller，初始化 Codeigniter 基礎資源。
#. Router 解釋 HTTP 請求 去找到這個請求該往哪裡走。
#. 如果 cache 檔案存在，將會直接通過一般系統執行回傳給瀏覽器資料。
#. Security。在傳給 application controller 讀取之前， HTTP 請求 以及 所有使用者送出的資料會通過它來過濾。
#. Controller 載入 model、core libraries、helpers、以及程式需要的所有特殊資源。
#. 最後 View 是最終的呈現結果，來送回給瀏覽器。如果快取是啟動的， view 會在第一次快取一份，之後使用者在發 HTTP 請求的時候，就會直接回傳這份快取，不需要再通過 Router 了。 

.. |CodeIgniter application flow| image:: ../images/appflowchart.gif
