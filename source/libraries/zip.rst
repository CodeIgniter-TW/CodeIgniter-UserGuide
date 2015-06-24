##################
Zip 類別
##################

CodeIgniter 的 Zip 類別可以讓你產生 Zip 壓縮檔。
壓縮檔可以下載到你的電腦或是存放在目錄內。

.. contents::
  :local:

.. raw:: html

  <div class="custom-index container"></div>

****************************
使用 Zip 類別
****************************

初始化類別
======================

就像 CodeIgniter 其它多數類別一樣，Zip 類別可以在你的 controller 內透過
$this->load->library 函式來初始化::

	$this->load->library('zip');

載入之後，就可以這樣取得 Zip 物件：

	$this->zip

使用範例
=============

這個範例示範了如何壓縮一個檔案，並將其儲存在伺服器的目錄內，再下載到你的電腦。

::

	$name = 'mydata1.txt';
	$data = 'A Data String!';

	$this->zip->add_data($name, $data);

	// 將 zip 檔案寫入到伺服器的目錄內，命名為 "my_backup.zip"
	$this->zip->archive('/path/to/directory/my_backup.zip');

	// 將檔案下載到你的電腦，命名為 "my_backup.zip"
	$this->zip->download('my_backup.zip');

***************
類別參考資料
***************

.. php:class:: CI_Zip

	.. attribute:: $compression_level = 2

		要使用的壓縮等級。

		範圍為 0 到 9，9 是最高壓縮等級，而 0 是不壓縮::

			$this->zip->compression_level = 0;

	.. php:method:: add_data($filepath[, $data = NULL])

		:param	mixed	$filepath: 單一檔案路徑，或是一個陣列，裡面包含了 檔案 => 內容 資料對
		:param	array	$data: 檔案內容（若 $filepath 是陣列則忽略）
		:rtype:	void

		將資料加進 Zip 壓縮檔。可以運作在單一檔案或多檔案模式。

		當加入單一檔案時，第一個參數必須包含你想使用的檔案名稱，而第二個參數必須包含檔案內容::

			$name = 'mydata1.txt';
			$data = 'A Data String!';
			$this->zip->add_data($name, $data);

			$name = 'mydata2.txt';
			$data = 'Another Data String!';
			$this->zip->add_data($name, $data);

		當加入多個檔案時，第一個參數必須含有 *檔案 => 內容* 資料對，而且第二個參數將被忽略::

			$data = array(
				'mydata1.txt' => 'A Data String!',
				'mydata2.txt' => 'Another Data String!'
			);

			$this->zip->add_data($data);

		如果你希望將壓縮檔內的資料放在子目錄內，只要將路徑加到檔案名稱內即可::

			$name = 'personal/my_bio.txt';
			$data = 'I was born in an elevator...';

			$this->zip->add_data($name, $data);

		上面的範例會將 my_bio.txt 放進名為 personal 的子目錄內。

	.. php:method:: add_dir($directory)

		:param	mixed	$directory: 目錄名稱，或是一個陣列，裡面包含多個目錄
		:rtype:	void

		讓你能夠加入目錄。
		通常這個方法是不必要的，因為你可以在使用 ``$this->zip->add_data()`` 時將資料放進目錄中，
		但如果你想創建一個空目錄時可以這樣做::

			$this->zip->add_dir('myfolder'); // 建立一個空目錄 "myfolder"

	.. php:method:: read_file($path[, $archive_filepath = FALSE])

		:param	string	$path: 檔案路徑
		:param	mixed	$archive_filepath: 新的檔案名稱/路徑字串，或是布林值決定是否維持原來路徑
		:returns:	成功時回傳 TRUE，失敗時回傳 FALSE
		:rtype:	bool

		讓你能夠壓縮伺服器上現有的檔案。
		提供一個檔案路徑，然後 zip 類別就可以讀取並加入壓縮檔::

			$path = '/path/to/photo.jpg';

			$this->zip->read_file($path);

			// 下載壓縮檔到你的電腦，命名為 "my_backup.zip"
			$this->zip->download('my_backup.zip');

		如果你希望 Zip 壓縮檔能維持檔案原本的目錄結構，
		就在第二個參數傳入 TRUE (boolean)::

			$path = '/path/to/photo.jpg';

			$this->zip->read_file($path, TRUE);

			// 下載壓縮檔到你的電腦，命名為 "my_backup.zip"
			$this->zip->download('my_backup.zip');

		在上面的例子，photo.jpg 將會被放進 *path/to/* 目錄中。

		你也可以為新加入的檔案指定一個新路徑::

			$path = '/path/to/photo.jpg';
			$new_path = '/new/path/some_photo.jpg';

			$this->zip->read_file($path, $new_path);

			// 下載壓縮檔，裡面含有 /new/path/some_photo.jpg
			$this->zip->download('my_archive.zip');

	.. php:method:: read_dir($path[, $preserve_filepath = TRUE[, $root_path = NULL]])

		:param	string	$path: 檔案路徑
		:param	bool	$preserve_filepath: 是否維持原本路徑
		:param	string	$root_path: 在壓縮檔內要排除掉的部份路徑
		:returns:	成功時回傳 TRUE，失敗時回傳 FALSE
		:rtype:	bool

		讓你能夠壓縮伺服器上現有的目錄。
		給予目錄的路徑，zip 類別就會讀取目錄內所有子目錄及檔案並加入壓縮檔。::

			$path = '/path/to/your/directory/';

			$this->zip->read_dir($path);

			// 下載壓縮檔到你的電腦，命名為 "my_backup.zip"
			$this->zip->download('my_backup.zip');

		預設情況下 Zip 壓縮檔會放進第一個參數路徑上的所有目錄。
		如果你希望忽略目標目錄上層的路徑，
		可以在第二個參數使用 FALSE (boolean)。例如::

			$path = '/path/to/your/directory/';

			$this->zip->read_dir($path, FALSE);

		這將會產生含有一個目錄 "directory" 的壓縮檔，內含相對應的所有子目錄，
		但不會含有 */path/to/your* 這部份的路徑。

	.. php:method:: archive($filepath)

		:param	string	$filepath: 目標壓縮檔的路徑
		:returns:	成功時回傳 TRUE，失敗時回傳 FALSE
		:rtype:	bool

		將壓縮檔寫到伺服器上的目錄中。
		請提供一個有效的伺服器路徑做為檔案名稱。
		並確保目錄是可寫的（通常使用755即可）。範例::

			$this->zip->archive('/path/to/folder/myarchive.zip'); // 建立一個叫做 myarchive.zip 的檔案

	.. php:method:: download($filename = 'backup.zip')

		:param	string	$filename: 壓縮檔名稱
		:rtype:	void

		讓壓縮檔開始從伺服器下載。
		你必須提供這個壓縮檔下載時的名稱。例如::

			$this->zip->download('latest_stuff.zip'); // 檔案將下載為 "latest_stuff.zip"

		.. note:: 在你呼叫這個方法時，不要在 controller 裡面顯示任何資料。
			因為它會送出數個標頭(headers)，並讓資料被當成二進位檔案。

	.. php:method:: get_zip()

		:returns:	壓縮檔內容
		:rtype:	string

		回傳壓縮後的檔案資料。
		一般而言你不會需要這個方法，除非你想對資料做些特別的事情::

			$name = 'my_bio.txt';
			$data = 'I was born in an elevator...';

			$this->zip->add_data($name, $data);

			$zip_file = $this->zip->get_zip();

	.. php:method:: clear_data()

		:rtype:	void

		Zip 類別將會快取你的壓縮檔資料，以避免每次呼叫上列方法時都要重新壓縮。
		然而，若你需要建立數個壓縮檔，每個包含不同的資料時，
		你可以在每個步驟之間清除這些快取資料。例如::

			$name = 'my_bio.txt';
			$data = 'I was born in an elevator...';

			$this->zip->add_data($name, $data);
			$zip_file = $this->zip->get_zip();

			$this->zip->clear_data();

			$name = 'photo.jpg';
			$this->zip->read_file("/path/to/photo.jpg"); // 讀取檔案內容

			$this->zip->download('myphotos.zip');
