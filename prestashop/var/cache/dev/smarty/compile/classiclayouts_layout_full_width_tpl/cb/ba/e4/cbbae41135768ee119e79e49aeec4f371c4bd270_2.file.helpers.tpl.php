<?php
/* Smarty version 4.3.4, created on 2026-05-05 16:53:16
  from 'D:\prog\eval\eval-n1-p17\prestashop\themes\classic\templates\_partials\helpers.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_69f9f64c3371f4_92602364',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'cbbae41135768ee119e79e49aeec4f371c4bd270' => 
    array (
      0 => 'D:\\prog\\eval\\eval-n1-p17\\prestashop\\themes\\classic\\templates\\_partials\\helpers.tpl',
      1 => 1738215300,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_69f9f64c3371f4_92602364 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->smarty->ext->_tplFunction->registerTplFunctions($_smarty_tpl, array (
  'renderLogo' => 
  array (
    'compiled_filepath' => 'D:\\prog\\eval\\eval-n1-p17\\prestashop\\var\\cache\\dev\\smarty\\compile\\classiclayouts_layout_full_width_tpl\\cb\\ba\\e4\\cbbae41135768ee119e79e49aeec4f371c4bd270_2.file.helpers.tpl.php',
    'uid' => 'cbbae41135768ee119e79e49aeec4f371c4bd270',
    'call_name' => 'smarty_template_function_renderLogo_183210435569f9f64c32d9a4_42764639',
  ),
));
?> 

<?php }
/* smarty_template_function_renderLogo_183210435569f9f64c32d9a4_42764639 */
if (!function_exists('smarty_template_function_renderLogo_183210435569f9f64c32d9a4_42764639')) {
function smarty_template_function_renderLogo_183210435569f9f64c32d9a4_42764639(Smarty_Internal_Template $_smarty_tpl,$params) {
foreach ($params as $key => $value) {
$_smarty_tpl->tpl_vars[$key] = new Smarty_Variable($value, $_smarty_tpl->isRenderingCache);
}
?>

  <a href="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['urls']->value['pages']['index'], ENT_QUOTES, 'UTF-8');?>
">
    <img
      class="logo img-fluid"
      src="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['shop']->value['logo_details']['src'], ENT_QUOTES, 'UTF-8');?>
"
      alt="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['shop']->value['name'], ENT_QUOTES, 'UTF-8');?>
"
      width="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['shop']->value['logo_details']['width'], ENT_QUOTES, 'UTF-8');?>
"
      height="<?php echo htmlspecialchars((string) $_smarty_tpl->tpl_vars['shop']->value['logo_details']['height'], ENT_QUOTES, 'UTF-8');?>
">
  </a>
<?php
}}
/*/ smarty_template_function_renderLogo_183210435569f9f64c32d9a4_42764639 */
}
