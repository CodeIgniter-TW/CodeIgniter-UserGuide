#####################
�q 3.0.5 �ɯŨ� 3.0.6
#####################

�b����ɯŤ��e�A�A���ӧ� index.php ���R�A�ɮסA�N�����ɦV���R�A�����C

�B�J 1�G��s���� CodeIgniter �ɮ�
=================================

���N *system/* �ؿ����U���Ҧ��ؿ��P�ɮ�

.. �`�N:: ���p�z���ק惡�ؿ����U���ɮסA�·нХ��ƻs�ƥ��C

�B�J 2�G��s index.php �ɮ� (��ܩʪ�)
=============================================

We've made some tweaks to the index.php file, mostly related to proper
usage of directory separators (i.e. use the ``DIRECTORY_SEPARATOR``
constant instead of a hard coded forward slash "/").

Nothing will break if you skip this step, but if you're running Windows
or just want to be up to date with every change - we do recommend that
you update your index.php file.

*Tip: Just copy the ``ENVIRONMENT``, ``$system_path``, ``$application_folder``
and ``$view_folder`` declarations from the old file and put them into the
new one, replacing the defaults.*

�B�J 3�G���� 'prep_for_form' ���ϥ� (�j�P��ĳ)
==============================================

The :doc:`Form Validation Library <../libraries/form_validation>` has a
``prep_for_form()`` method, which is/can also be used as a rule in
``set_rules()`` to automatically perform HTML encoding on input data.

Automatically encoding input (instead of output) data is a bad practice in
the first place, and CodeIgniter and PHP itself offer other alternatives
to this method anyway.
For example, :doc:`Form Helper <../helpers/form_helper>` functions will
automatically perform HTML escaping when necessary.

�]���A *prep_for_form* �Ҳ�/�W�h �X�G�O�S���γB���A�ñN�� 3.1 ���᪺�����N�䲾���C

.. �`�N:: �o��k�̵M�i�H�ϥΡA���ڭ̱j�P��ĳ�A�ɧ֧R���o��k���ϥΡC
