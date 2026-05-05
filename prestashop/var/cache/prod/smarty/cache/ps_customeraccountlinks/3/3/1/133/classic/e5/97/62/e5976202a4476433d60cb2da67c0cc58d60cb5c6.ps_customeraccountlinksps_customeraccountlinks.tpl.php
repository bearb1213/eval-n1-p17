<?php
/* Smarty version 4.3.4, created on 2026-05-05 12:46:34
  from 'module:ps_customeraccountlinksps_customeraccountlinks.tpl' */

/* @var Smarty_Internal_Template $_smarty_tpl */
if ($_smarty_tpl->_decodeProperties($_smarty_tpl, array (
  'version' => '4.3.4',
  'unifunc' => 'content_69f9bc7a2f1cb9_48730632',
  'has_nocache_code' => false,
  'file_dependency' => 
  array (
    '42f9461127ce7396a601c2484841253ea5ba658f' => 
    array (
      0 => 'module:ps_customeraccountlinksps_customeraccountlinks.tpl',
      1 => 1738215300,
      2 => 'module',
    ),
  ),
  'cache_lifetime' => 31536000,
),true)) {
function content_69f9bc7a2f1cb9_48730632 (Smarty_Internal_Template $_smarty_tpl) {
$_smarty_tpl->smarty->ext->_tplFunction->registerTplFunctions($_smarty_tpl, array (
  'renderLogo' => 
  array (
    'compiled_filepath' => 'D:\\prog\\eval\\eval_n1\\prestashop\\var\\cache\\prod\\smarty\\compile\\classiclayouts_layout_full_width_tpl\\6e\\89\\e3\\6e89e3ee5af84f3f789b5df98450cecbb906a45e_2.file.helpers.tpl.php',
    'uid' => '6e89e3ee5af84f3f789b5df98450cecbb906a45e',
    'call_name' => 'smarty_template_function_renderLogo_112633952369f9bc1baddd63_07721998',
  ),
));
?>
<div id="block_myaccount_infos" class="col-md-3 links wrapper">
  <p class="h3 myaccount-title hidden-sm-down">
    <a class="text-uppercase" href="http://localhost:8000/index.php?controller=my-account" rel="nofollow">
      Votre compte
    </a>
  </p>
  <div class="title clearfix hidden-md-up" data-target="#footer_account_list" data-toggle="collapse">
    <span class="h3">Votre compte</span>
    <span class="float-xs-right">
      <span class="navbar-toggler collapse-icons">
        <i class="material-icons add">&#xE313;</i>
        <i class="material-icons remove">&#xE316;</i>
      </span>
    </span>
  </div>
  <ul class="account-list collapse" id="footer_account_list">
            <li><a href="http://localhost:8000/index.php?controller=identity" title="Informations" rel="nofollow">Informations</a></li>
                  <li><a href="http://localhost:8000/index.php?controller=address" title="Ajouter une première adresse" rel="nofollow">Ajouter une première adresse</a></li>
                          <li><a href="http://localhost:8000/index.php?controller=history" title="Commandes" rel="nofollow">Commandes</a></li>
                          <li><a href="http://localhost:8000/index.php?controller=order-slip" title="Avoirs" rel="nofollow">Avoirs</a></li>
                                  <li>
    <a href="http://localhost:8000/index.php?fc=module&amp;module=blockwishlist&amp;controller=lists&amp;id_lang=1" title="Mes listes d&#039;envies" rel="nofollow">
      Liste d&#039;envies
    </a>
  </li>

        <li><a href="http://localhost:8000/index.php?mylogout=" title="Me déconnecter" rel="nofollow">Déconnexion</a></li>
       
	</ul>
</div>
<?php }
}
