############
快取驅動類別
############

CodeIgniter 以最普及的方式，展現一種快速又動態的快取。
除了使用檔案之外的快取，都需要特定的伺服器設備需求，若沒有則會產生嚴重的錯誤。

.. contents::
  :local:

.. raw:: html

  <div class="custom-index container"></div>

********
使用範例
********

接下來的範例會讀取快取驅動類別，並指定使用 APC 驅動。如果 APC 無法在主機環境下使用，那就會退回使用檔案的快取方式。

::

	$this->load->driver('cache', array('adapter' => 'apc', 'backup' => 'file'));

	if ( ! $foo = $this->cache->get('foo'))
	{
		echo 'Saving to the cache!<br />';
		$foo = 'foobarbaz!';

		// 過 5 分鐘後會存到快取
		$this->cache->save('foo', $foo, 300);
	}

	echo $foo;


當你在同樣的環境中執行多種程式，你也可以在快取名稱前加入前綴字元，在 "key_prefix" 的地方做設定，這將會有效地避免衝突。


::

	$this->load->driver('cache',
		array('adapter' => 'apc', 'backup' => 'file', 'key_prefix' => 'my_')
	);
	
	$this->cache->get('foo'); // 將會取得輸入的快取名稱 'my_foo'

********
類別參考
********

.. php:class:: CI_Cache

	.. php:method:: is_supported($driver)

		:param	string	$driver: 驅動的名稱
		:returns:	若支援為 TRUE，不支援則為 FALSE
		:rtype:	布林值

		這個方法是當你透過 "$this->cache->get()" 存取驅動時會自動呼叫。為了確保主機環境支援驅動程式，當個別驅動(individual drivers)正在運作時，請務必使用此方法。
		::

			if ($this->cache->apc->is_supported())
			{
				if ($data = $this->cache->apc->get('my_cache'))
				{
					// do things.
				}
			}

	.. php:method:: get($id)

		:param	string	$id: 快取項目名稱
		:returns:	項目值，或是當找不到時則會使用 FALSE
		:rtype:	mixed

		此方式將會從快取中取得一個項目。若項目不存在，則會回傳 FALSE。
		::

			$foo = $this->cache->get('my_cached_item');

	.. php:method:: save($id, $data[, $ttl = 60[, $raw = FALSE]])

		:param	string	$id: 快取項目名稱
		:param	mixed	$data: 存取的資料
		:param	int	$ttl: 存活時間，以秒計(預設值60)
		:param	bool	$raw: 是否儲存原本的值
		:returns:	成功為 TRUE，失敗則為 FALSE
		:rtype:	string

		此方法將會儲存項目至快取空間。若儲存失敗，則回傳 FALSE。
		::

			$this->cache->save('cache_item_id', 'data_to_cache');

		.. note:: ``$raw`` 參數是為了讓 ``increment()`` 及 ``decrement()`` 運作，而被 APC 及 Memcache 所用。

	.. php:method:: delete($id)

		:param	string	$id: 快取項目名稱
		:returns:	成功為 TRUE，失敗則為 FALSE
		:rtype:	bool

		此方法將會從快取空間中刪除一個特定的項目。若項目刪除失敗，則會回傳 FALSE。
		::

			$this->cache->delete('cache_item_id');

	.. php:method:: increment($id[, $offset = 1])

		:param	string	$id: 快取 ID
		:param	int	$offset: 加入的 Step/value 
		:returns:	成功則為新的值，失敗則為 FALSE
		:rtype:	mixed

		在原始的快取空間值中增量
		::

			// 'iterator' 有值是 2

			$this->cache->increment('iterator'); // 'iterator' 現在是 3

			$this->cache->increment('iterator', 3); // 'iterator' 現在是 6

	.. php:method:: decrement($id[, $offset = 1])

		:param	string	$id: 快取 ID
		:param	int	$offset: 減少的 Step/value
		:returns:	成功則為新的值，失敗則為 FALSE
		:rtype:	mixed

		在原始的快取空間值中減量
		::

			// 'iterator' 有值是 6

			$this->cache->decrement('iterator'); // 'iterator' 現在是 5

			$this->cache->decrement('iterator', 2); // 'iterator' 現在是 3

	.. php:method:: clean()

		:returns:	成功為 TRUE，失敗為 FALSE
		:rtype:	bool

		此方法將會「清除」所有快取。若快取檔清除失敗，則會回傳 FALSE。
		::

			$this->cache->clean();

	.. php:method:: cache_info()

		:returns:	整個快取資料庫的資訊
		:rtype:	mixed

		此方法將會回傳整個快取的資訊。
		::

			var_dump($this->cache->cache_info());

		.. note:: 回傳的資訊和其結構是根據轉換器 (adaper) 的使用。

	.. php:method:: get_metadata($id)

		:param	string	$id: 快取項目名稱
		:returns:	快取項目的元數據 (Metadata)
		:rtype:	mixed

		此方法將會回傳快取裡特定項目的細部資訊。
		::

			var_dump($this->cache->get_metadata('my_cached_item'));

		.. note:: 回傳的資訊和其結構是根據轉換器 (adaper) 的使用。

********
驅動程式
********

Alternative PHP Cache (APC) 快取
================================

上述所列都可以用以下方法，不透過轉換器 (adapter) 而存取驅動程式載入器::

	$this->load->driver('cache');
	$this->cache->apc->save('foo', 'bar', 10);

更多關於 APC 的資訊，請見
`http://php.net/apc <http://php.net/apc>`_.

檔案快取
========

不像其他輸出類別的快取，檔案快取允許緩存少量的顯示檔案。
但使用此方式請留意，確保已評估你的應用程式，由於硬碟 I/O 的緣故，可能會降低快取的效益。

上述所列都可以用以下方法，不透過轉換器 (adapter) 而存取驅動程式載入器::

	$this->load->driver('cache');
	$this->cache->file->save('foo', 'bar', 10);

Memcached 快取
==============

要啟動多個 Memcached 服務，可以在 memcached.php 組態檔案中指定，
檔案位於 application/config/* directory。

上述所列都可以用以下方法，不透過轉換器 (adapter) 而存取驅動程式載入器::

	$this->load->driver('cache');
	$this->cache->memcached->save('foo', 'bar', 10);

更多關於 Memcached 的資訊，請見
`http://php.net/memcached <http://php.net/memcached>`_.

WinCache 快取
=============

在 Windows 平台下，你可以使用 WinCache 驅動程式。

上述所列都可以用以下方法，不透過轉換器 (adapter) 而存取驅動程式載入器::

	$this->load->driver('cache');
	$this->cache->wincache->save('foo', 'bar', 10);

更多關於 WinCache 的資訊，請見
`http://php.net/wincache <http://php.net/wincache>`_.

Redis 快取
==========

Redis 是一種內存的鍵-值對應的儲存空間 (key-value store)，它可以在 LRU 快取模式中執行。
要使用它, 你須要 `Redis 伺服器與 phpredis PHP 擴展 (extension) <https://github.com/phpredis/phpredis>`_.

Config 選用連結到 redis 伺服器，必須儲存在 application/config/redis.php 檔案.
可用的選項為::
	
	$config['socket_type'] = 'tcp'; //`tcp` or `unix`
	$config['socket'] = '/var/run/redis.sock'; // in case of `unix` socket type
	$config['host'] = '127.0.0.1';
	$config['password'] = NULL;
	$config['port'] = 6379;
	$config['timeout'] = 0;

上述所列都可以用以下方法，不透過轉換器 (adapter) 而存取驅動程式載入器::

	$this->load->driver('cache');
	$this->cache->redis->save('foo', 'bar', 10);

更多關於　Redis 的資訊，請見
`http://redis.io <http://redis.io>`_.

Dummy 快取
===========

這是快取的後端，它並不儲存資料，而是在驅動程式不支援的時候，在系統環境中保有你的快取程式碼。
