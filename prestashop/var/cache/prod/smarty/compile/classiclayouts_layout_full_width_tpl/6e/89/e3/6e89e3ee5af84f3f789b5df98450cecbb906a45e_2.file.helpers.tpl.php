<?php
/* Smarty version 4.3.4, created on 2026-05-05 12:44:59
  from 'D:\prog\eval\eval_n1\prestashop\themes\classic\templates\_partials\helpers.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_69f9bc1bae7646_45366120',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '6e89e3ee5af84f3f789b5df98450cecbb906a45e' => 
    array (
      0 => 'D:\\prog\\eval\\eval_n1\\prestashop\\themes\\classic\\templates\\_partials\\helpers.tpl',
      1 => 1738215300,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_69f9bc1bae7646_45366120 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->smarty->ext->_tplFunction->registerTplFunctions($_smarty_tpl, array (
  'renderLogo' => 
  array (
    'compiled_filepath' => 'D:\\prog\\eval\\eval_n1\\prestashop\\var\\cache\\prod\\smarty\\compile\\classiclayouts_layout_full_width_tpl\\6e\\89\\e3\\6e89e3ee5af84f3f789b5df98450cecbb906a45e_2.file.helpers.tpl.php',
    'uid' => '6e89e3ee5af84f3f789b5df98450cecbb906a45e',
    'call_name' => 'smarty_template_function_renderLogo_112633952369f9bc1baddd63_07721998',
  ),
));
?> 

<?php }
/* smarty_template_function_renderLogo_112633952369f9bc1baddd63_07721998 */
if (!function_exists('smarty_template_function_renderLogo_112633952369f9bc1baddd63_07721998')) {
function smarty_template_function_renderLogo_112633952369f9bc1baddd63_07721998(Smarty_Internal_Template $_smarty_tpl,$params) {
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
/*/ smarty_template_function_renderLogo_112633952369f9bc1baddd63_07721998 */
}
