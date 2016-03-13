###############
故障排除
###############

如果無論如何對不同URL發出請求，你的網頁都在預設頁面讀取了話，有可能你的 Server 不支援 PATH_INFO 變數，它主要是為了增加搜尋引擎友好的 URLs。
第一步，打開 *application/config/config.php* 檔案然後尋找 URI Protocol 資訊。
它會建議你修改幾個設定。 如果修改了這些設定還是無法解決，你需要強制 CodeIgniter 去增加『?』到你的 URLs。打開你的 *application/config/config.php* 檔案以及修改它們::

	$config['index_page'] = "index.php";

改成::

	$config['index_page'] = "index.php?";

