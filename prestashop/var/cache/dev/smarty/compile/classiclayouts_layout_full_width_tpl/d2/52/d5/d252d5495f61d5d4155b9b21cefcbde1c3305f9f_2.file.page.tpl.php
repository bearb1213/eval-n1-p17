<?php
/* Smarty version 4.3.4, created on 2026-05-05 16:53:16
  from 'D:\prog\eval\eval-n1-p17\prestashop\themes\classic\templates\page.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_69f9f64c2c3fa7_21441588',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    'd252d5495f61d5d4155b9b21cefcbde1c3305f9f' => 
    array (
      0 => 'D:\\prog\\eval\\eval-n1-p17\\prestashop\\themes\\classic\\templates\\page.tpl',
      1 => 1738215300,
      2 => 'file',
    ),
  ),
  'includes' => 
  array (
  ),
),false)) {
function content_69f9f64c2c3fa7_21441588 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->_loadInheritance();
$_smarty_tpl->inheritance->init($_smarty_tpl, true);
?>


<?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_72479513769f9f64c2bcf65_21599575', 'content');
?>

<?php $_smarty_tpl->inheritance->endChild($_smarty_tpl, $_smarty_tpl->tpl_vars['layout']->value);
}
/* {block 'page_title'} */
class Block_64950841669f9f64c2bdaa8_96834001 extends Smarty_Internal_Block
{
public $callsChild = 'true';
public $hide = 'true';
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

        <header class="page-header">
          <h1><?php 
$_smarty_tpl->inheritance->callChild($_smarty_tpl, $this);
?>
</h1>
        </header>
      <?php
}
}
/* {/block 'page_title'} */
/* {block 'page_header_container'} */
class Block_113845813769f9f64c2bd471_71970537 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

      <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_64950841669f9f64c2bdaa8_96834001', 'page_title', $this->tplIndex);
?>

    <?php
}
}
/* {/block 'page_header_container'} */
/* {block 'page_content_top'} */
class Block_148109065269f9f64c2c2067_35167523 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
}
}
/* {/block 'page_content_top'} */
/* {block 'page_content'} */
class Block_201801570269f9f64c2c26a2_34393289 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

          <!-- Page content -->
        <?php
}
}
/* {/block 'page_content'} */
/* {block 'page_content_container'} */
class Block_194683064769f9f64c2c1b91_85147036 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

      <div id="content" class="page-content card card-block">
        <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_148109065269f9f64c2c2067_35167523', 'page_content_top', $this->tplIndex);
?>

        <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_201801570269f9f64c2c26a2_34393289', 'page_content', $this->tplIndex);
?>

      </div>
    <?php
}
}
/* {/block 'page_content_container'} */
/* {block 'page_footer'} */
class Block_2737782669f9f64c2c33e1_87229363 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

          <!-- Footer content -->
        <?php
}
}
/* {/block 'page_footer'} */
/* {block 'page_footer_container'} */
class Block_37073711069f9f64c2c3016_63903495 extends Smarty_Internal_Block
{
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>

      <footer class="page-footer">
        <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_2737782669f9f64c2c33e1_87229363', 'page_footer', $this->tplIndex);
?>

      </footer>
    <?php
}
}
/* {/block 'page_footer_container'} */
/* {block 'content'} */
class Block_72479513769f9f64c2bcf65_21599575 extends Smarty_Internal_Block
{
public $subBlocks = array (
  'content' => 
  array (
    0 => 'Block_72479513769f9f64c2bcf65_21599575',
  ),
  'page_header_container' => 
  array (
    0 => 'Block_113845813769f9f64c2bd471_71970537',
  ),
  'page_title' => 
  array (
    0 => 'Block_64950841669f9f64c2bdaa8_96834001',
  ),
  'page_content_container' => 
  array (
    0 => 'Block_194683064769f9f64c2c1b91_85147036',
  ),
  'page_content_top' => 
  array (
    0 => 'Block_148109065269f9f64c2c2067_35167523',
  ),
  'page_content' => 
  array (
    0 => 'Block_201801570269f9f64c2c26a2_34393289',
  ),
  'page_footer_container' => 
  array (
    0 => 'Block_37073711069f9f64c2c3016_63903495',
  ),
  'page_footer' => 
  array (
    0 => 'Block_2737782669f9f64c2c33e1_87229363',
  ),
);
public function callBlock(Smarty_Internal_Template $_smarty_tpl) {
?>


  <section id="main">

    <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_113845813769f9f64c2bd471_71970537', 'page_header_container', $this->tplIndex);
?>


    <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_194683064769f9f64c2c1b91_85147036', 'page_content_container', $this->tplIndex);
?>


    <?php 
$_smarty_tpl->inheritance->instanceBlock($_smarty_tpl, 'Block_37073711069f9f64c2c3016_63903495', 'page_footer_container', $this->tplIndex);
?>


  </section>

<?php
}
}
/* {/block 'content'} */
}
