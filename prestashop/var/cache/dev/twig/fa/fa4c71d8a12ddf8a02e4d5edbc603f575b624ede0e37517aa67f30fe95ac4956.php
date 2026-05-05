<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* @PrestaShop/Admin/Sell/Order/Order/Blocks/change_orders_status_modal.html.twig */
class __TwigTemplate_265885cc642d501db91f08e8cc3c49225a29dcd4275fe41775cb8a5116fe0bb5 extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->enter($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PrestaShop/Admin/Sell/Order/Order/Blocks/change_orders_status_modal.html.twig"));

        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02 = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->enter($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PrestaShop/Admin/Sell/Order/Order/Blocks/change_orders_status_modal.html.twig"));

        // line 25
        echo "
";
        // line 26
        $this->loadTemplate("@PrestaShop/Admin/Sell/Order/Order/Blocks/change_orders_status_modal.html.twig", "@PrestaShop/Admin/Sell/Order/Order/Blocks/change_orders_status_modal.html.twig", 26, "1487067260")->display(twig_array_merge($context, ["id" => "changeOrdersStatusModal", "title" => $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Choose an order status", [], "Admin.Orderscustomers.Feature"), "closable" => true, "actions" => [0 => ["type" => "button", "label" => $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Update status", [], "Admin.Orderscustomers.Feature"), "class" => "btn btn-primary btn-lg js-submit-modal-form-btn"]]]));
        
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->leave($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof);

        
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->leave($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof);

    }

    public function getTemplateName()
    {
        return "@PrestaShop/Admin/Sell/Order/Order/Blocks/change_orders_status_modal.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  46 => 26,  43 => 25,);
    }

    public function getSourceContext()
    {
        return new Source("{#**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 *#}

{% embed '@PrestaShop/Admin/Helpers/bootstrap_popup.html.twig' with {
  'id': 'changeOrdersStatusModal',
  'title': 'Choose an order status'|trans({}, 'Admin.Orderscustomers.Feature'),
  'closable': true,
  'actions': [{
    'type': 'button',
    'label': 'Update status'|trans({}, 'Admin.Orderscustomers.Feature'),
    'class': 'btn btn-primary btn-lg js-submit-modal-form-btn',
  }],
} %}
  {% block content %}
    <div class=\"modal-body\">
      {{ form_start(changeOrderStatusesForm, {
        'action': path('admin_orders_change_orders_status'),
        'attr': {
          'data-bulk-inputs-id': changeOrderStatusesForm.order_ids.vars.id
        }
      }) }}

      <div class=\"form-group mb-0\">
        {{ form_widget(changeOrderStatusesForm.new_order_status_id) }}
      </div>

      <div class=\"d-none\">
        {{ form_widget(changeOrderStatusesForm.order_ids) }}
      </div>

      {{ form_end(changeOrderStatusesForm) }}
    </div>
  {% endblock %}
{% endembed %}
", "@PrestaShop/Admin/Sell/Order/Order/Blocks/change_orders_status_modal.html.twig", "D:\\prog\\eval\\eval_n1\\prestashop\\src\\PrestaShopBundle\\Resources\\views\\Admin\\Sell\\Order\\Order\\Blocks\\change_orders_status_modal.html.twig");
    }
}


/* @PrestaShop/Admin/Sell/Order/Order/Blocks/change_orders_status_modal.html.twig */
class __TwigTemplate_265885cc642d501db91f08e8cc3c49225a29dcd4275fe41775cb8a5116fe0bb5___1487067260 extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->blocks = [
            'content' => [$this, 'block_content'],
        ];
    }

    protected function doGetParent(array $context)
    {
        return "@PrestaShop/Admin/Helpers/bootstrap_popup.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->enter($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PrestaShop/Admin/Sell/Order/Order/Blocks/change_orders_status_modal.html.twig"));

        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02 = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->enter($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PrestaShop/Admin/Sell/Order/Order/Blocks/change_orders_status_modal.html.twig"));

        $this->parent = $this->loadTemplate("@PrestaShop/Admin/Helpers/bootstrap_popup.html.twig", "@PrestaShop/Admin/Sell/Order/Order/Blocks/change_orders_status_modal.html.twig", 26);
        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->leave($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof);

        
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->leave($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof);

    }

    // line 36
    public function block_content($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->enter($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "content"));

        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02 = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->enter($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "content"));

        // line 37
        echo "    <div class=\"modal-body\">
      ";
        // line 38
        echo         $this->env->getRuntime('Symfony\Component\Form\FormRenderer')->renderBlock((isset($context["changeOrderStatusesForm"]) || array_key_exists("changeOrderStatusesForm", $context) ? $context["changeOrderStatusesForm"] : (function () { throw new RuntimeError('Variable "changeOrderStatusesForm" does not exist.', 38, $this->source); })()), 'form_start', ["action" => $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getPath("admin_orders_change_orders_status"), "attr" => ["data-bulk-inputs-id" => twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source,         // line 41
(isset($context["changeOrderStatusesForm"]) || array_key_exists("changeOrderStatusesForm", $context) ? $context["changeOrderStatusesForm"] : (function () { throw new RuntimeError('Variable "changeOrderStatusesForm" does not exist.', 41, $this->source); })()), "order_ids", [], "any", false, false, false, 41), "vars", [], "any", false, false, false, 41), "id", [], "any", false, false, false, 41)]]);
        // line 43
        echo "

      <div class=\"form-group mb-0\">
        ";
        // line 46
        echo $this->env->getRuntime('Symfony\Component\Form\FormRenderer')->searchAndRenderBlock(twig_get_attribute($this->env, $this->source, (isset($context["changeOrderStatusesForm"]) || array_key_exists("changeOrderStatusesForm", $context) ? $context["changeOrderStatusesForm"] : (function () { throw new RuntimeError('Variable "changeOrderStatusesForm" does not exist.', 46, $this->source); })()), "new_order_status_id", [], "any", false, false, false, 46), 'widget');
        echo "
      </div>

      <div class=\"d-none\">
        ";
        // line 50
        echo $this->env->getRuntime('Symfony\Component\Form\FormRenderer')->searchAndRenderBlock(twig_get_attribute($this->env, $this->source, (isset($context["changeOrderStatusesForm"]) || array_key_exists("changeOrderStatusesForm", $context) ? $context["changeOrderStatusesForm"] : (function () { throw new RuntimeError('Variable "changeOrderStatusesForm" does not exist.', 50, $this->source); })()), "order_ids", [], "any", false, false, false, 50), 'widget');
        echo "
      </div>

      ";
        // line 53
        echo         $this->env->getRuntime('Symfony\Component\Form\FormRenderer')->renderBlock((isset($context["changeOrderStatusesForm"]) || array_key_exists("changeOrderStatusesForm", $context) ? $context["changeOrderStatusesForm"] : (function () { throw new RuntimeError('Variable "changeOrderStatusesForm" does not exist.', 53, $this->source); })()), 'form_end');
        echo "
    </div>
  ";
        
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->leave($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof);

        
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->leave($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof);

    }

    public function getTemplateName()
    {
        return "@PrestaShop/Admin/Sell/Order/Order/Blocks/change_orders_status_modal.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  209 => 53,  203 => 50,  196 => 46,  191 => 43,  189 => 41,  188 => 38,  185 => 37,  175 => 36,  46 => 26,  43 => 25,);
    }

    public function getSourceContext()
    {
        return new Source("{#**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Open Software License (OSL 3.0)
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/OSL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to https://devdocs.prestashop.com/ for more information.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/OSL-3.0 Open Software License (OSL 3.0)
 *#}

{% embed '@PrestaShop/Admin/Helpers/bootstrap_popup.html.twig' with {
  'id': 'changeOrdersStatusModal',
  'title': 'Choose an order status'|trans({}, 'Admin.Orderscustomers.Feature'),
  'closable': true,
  'actions': [{
    'type': 'button',
    'label': 'Update status'|trans({}, 'Admin.Orderscustomers.Feature'),
    'class': 'btn btn-primary btn-lg js-submit-modal-form-btn',
  }],
} %}
  {% block content %}
    <div class=\"modal-body\">
      {{ form_start(changeOrderStatusesForm, {
        'action': path('admin_orders_change_orders_status'),
        'attr': {
          'data-bulk-inputs-id': changeOrderStatusesForm.order_ids.vars.id
        }
      }) }}

      <div class=\"form-group mb-0\">
        {{ form_widget(changeOrderStatusesForm.new_order_status_id) }}
      </div>

      <div class=\"d-none\">
        {{ form_widget(changeOrderStatusesForm.order_ids) }}
      </div>

      {{ form_end(changeOrderStatusesForm) }}
    </div>
  {% endblock %}
{% endembed %}
", "@PrestaShop/Admin/Sell/Order/Order/Blocks/change_orders_status_modal.html.twig", "D:\\prog\\eval\\eval_n1\\prestashop\\src\\PrestaShopBundle\\Resources\\views\\Admin\\Sell\\Order\\Order\\Blocks\\change_orders_status_modal.html.twig");
    }
}
