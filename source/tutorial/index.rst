########
教學
########

這篇教學旨在向你介紹 CodeIgniter 框架以及 MVC 架構的基本原則。它將一步步的告訴你一個基本的 CodeIgniter 程式是如何建構的。

在這篇教學裡，你將會製作一個 **簡單的新聞程式** 。你將從使用程式來讀取靜態頁面開始。接著，你會製作一個新聞模組，可以從資料庫讀取新聞項目。最後你會增加一個表單，用來在資料庫中增加新聞項目。

這篇教學主要會專注在:

-  Model-View-Controller 基礎知識
-  路由（Routing）基礎知識
-  表單驗證
-  使用”Query Builder“來做簡單的資料庫查詢

整篇教學被分為數個部份進行，每一部份解釋 CodeIgniter 框架的一小部份功能。詳列如下:

-  簡介，也就是目前這一頁，給你一些概念讓你知道接下來會做些什麼。
-  `靜態頁面 <static_pages.html>`_ ，將會教你關於控制器（Controller），視圖（View）與路由的基礎知識。
-  `新聞模組 <news_section.html>`_ ，這邊你將開始使用模型（Model），並且進行一些簡單的資料庫操作。
-  `新增新聞項目 <create_news_items.html>`_ ，將會進行更進階的資料庫操作以及表單驗證。
-  `結論 <conclusion.html>`_ ，將會指引你一些未來的學習方向以及其它資源。

祝你在 CodeIgniter 框架的探索中旅途愉快。

.. toctree::
	:glob:
	:hidden:
	:titlesonly:
	
	static_pages
	news_section
	create_news_items
	conclusion
