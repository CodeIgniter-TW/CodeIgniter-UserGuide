###########
Path 輔助函式
###########

The Path Helper file contains functions that permits you to work with
file paths on the server.

.. contents::
  :local:

.. raw:: html

  <div class="custom-index container"></div>

Loading this Helper
===================

This helper is loaded using the following code::

	$this->load->helper('path');

Available Functions
===================

The following functions are available:


.. php:function:: set_realpath($path[, $check_existance = FALSE])

	:param	string	$path: Path
	:param	bool	$check_existance: Whether to check if the path actually exists
	:returns:	An absolute path
	:rtype:	string

	This function will return a server path without symbolic links or
	relative directory structures. An optional second argument will
	cause an error to be triggered if the path cannot be resolved.

	Examples::

		$file = '/etc/php5/apache2/php.ini';
		echo set_realpath($file); // Prints '/etc/php5/apache2/php.ini'

		$non_existent_file = '/path/to/non-exist-file.txt';
		echo set_realpath($non_existent_file, TRUE);	// Shows an error, as the path cannot be resolved
		echo set_realpath($non_existent_file, FALSE);	// Prints '/path/to/non-exist-file.txt'

		$directory = '/etc/php5';
		echo set_realpath($directory);	// Prints '/etc/php5/'

		$non_existent_directory = '/path/to/nowhere';
		echo set_realpath($non_existent_directory, TRUE);	// Shows an error, as the path cannot be resolved
		echo set_realpath($non_existent_directory, FALSE);	// Prints '/path/to/nowhere'
