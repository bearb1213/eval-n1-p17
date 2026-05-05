<?php
/* Smarty version 4.3.4, created on 2026-05-05 13:53:02
  from 'module:blockwishlistviewstemplateshookdisplayCustomerAccount.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_69f9cc0e193748_81351944',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '725e557b3848ccdcad36e149271e839c438d981a' => 
    array (
      0 => 'module:blockwishlistviewstemplateshookdisplayCustomerAccount.tpl',
      1 => 1728042002,
      2 => 'module',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_69f9cc0e193748_81351944 (Smarty_Internal_Template $_smarty_tpl) {
?><!-- begin D:\prog\eval\eval_n1\prestashop/modules/blockwishlist/views/templates/hook/displayCustomerAccount.tpl -->
<a class="col-lg-4 col-md-6 col-sm-6 col-xs-12" id="wishlist-link" href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['url']->value, ENT_QUOTES, 'UTF-8');?>
">
  <span class="link-item">
    <i class="material-icons">favorite</i>
    <?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['wishlistsTitlePage']->value, ENT_QUOTES, 'UTF-8');?>

  </span>
</a>
<!-- end D:\prog\eval\eval_n1\prestashop/modules/blockwishlist/views/templates/hook/displayCustomerAccount.tpl --><?php }
}
