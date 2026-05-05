<?php
/* Smarty version 4.3.4, created on 2026-05-05 16:53:16
  from 'D:\prog\eval\eval-n1-p17\prestashop\themes\classic\templates\index.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_69f9f64c2a6d09_34809539',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'e4d16c2b59f504d837d0a1b9d50a08e5c73b7bc0' => 
    array (
      0 => 'D:\\prog\\eval\\eval-n1-p17\\prestashop\\themes\\classic\\templates\\index.tpl',
      1 => 1738215300,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_69f9f64c2a6d09_34809539 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, true);
?>


    <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_129116980969f9f64c295f19_16724341', 'page_content_container');
?>

<?php $_smarty_tpl->inheritance->endChild($_smarty_tpl, 'page.tpl');
}
/* {block 'page_content_top'} */
class Block_54427860669f9f64c2968b9_64551472 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
}
}
/* {/block 'page_content_top'} */
/* {block 'hook_home'} */
class Block_104240695469f9f64c2996b3_30354044 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

            <?php echo $_smarty_tpl->tpl_vars['HOOK_HOME']->value;?>

          <?php
}
}
/* {/block 'hook_home'} */
/* {block 'page_content'} */
class Block_100987620169f9f64c297767_87899944 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

          <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_104240695469f9f64c2996b3_30354044', 'hook_home', $this->tplIndex);
?>

        <?php
}
}
/* {/block 'page_content'} */
/* {block 'page_content_container'} */
class Block_129116980969f9f64c295f19_16724341 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'page_content_container' => 
  array (
    0 => 'Block_129116980969f9f64c295f19_16724341',
  ),
  'page_content_top' => 
  array (
    0 => 'Block_54427860669f9f64c2968b9_64551472',
  ),
  'page_content' => 
  array (
    0 => 'Block_100987620169f9f64c297767_87899944',
  ),
  'hook_home' => 
  array (
    0 => 'Block_104240695469f9f64c2996b3_30354044',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

      <section id="content" class="page-home">
        <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_54427860669f9f64c2968b9_64551472', 'page_content_top', $this->tplIndex);
?>


        <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_100987620169f9f64c297767_87899944', 'page_content', $this->tplIndex);
?>

      </section>
    <?php
}
}
/* {/block 'page_content_container'} */
}
