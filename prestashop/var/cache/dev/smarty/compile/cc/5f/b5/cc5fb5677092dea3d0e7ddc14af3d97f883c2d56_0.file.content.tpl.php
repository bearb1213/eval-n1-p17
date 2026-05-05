<?php
/* Smarty version 4.3.4, created on 2026-05-05 13:01:53
  from 'D:\prog\eval\eval_n1\prestashop\admin\themes\default\template\content.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_69f9c0114955d7_69864492',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'cc5fb5677092dea3d0e7ddc14af3d97f883c2d56' => 
    array (
      0 => 'D:\\prog\\eval\\eval_n1\\prestashop\\admin\\themes\\default\\template\\content.tpl',
      1 => 1777268640,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_69f9c0114955d7_69864492 (Smarty_Internal_Template $_smarty_tpl) {
?><div id="ajax_confirmation" class="alert alert-success hide"></div>
<div id="ajaxBox" style="display:none"></div>
<div id="content-message-box"></div>

<?php if ((isset($_smarty_tpl->tpl_vars['content']->value))) {?>
	<?php echo $_smarty_tpl->tpl_vars['content']->value;?>

<?php }
}
}
