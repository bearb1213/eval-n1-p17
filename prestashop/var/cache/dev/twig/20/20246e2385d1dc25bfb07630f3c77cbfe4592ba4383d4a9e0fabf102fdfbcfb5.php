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

/* @PrestaShop/Admin/Sell/Catalog/Stock/overview.html.twig */
class __TwigTemplate_5edef44cc224e634726490fb182cb1a6983e0cc09fe4b0f4b9e912c6fcd1c8db extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->blocks = [
            'stylesheets' => [$this, 'block_stylesheets'],
            'content' => [$this, 'block_content'],
            'javascripts' => [$this, 'block_javascripts'],
        ];
    }

    protected function doGetParent(array $context)
    {
        // line 25
        return "@PrestaShop/Admin/layout.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->enter($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PrestaShop/Admin/Sell/Catalog/Stock/overview.html.twig"));

        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02 = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->enter($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "template", "@PrestaShop/Admin/Sell/Catalog/Stock/overview.html.twig"));

        $this->parent = $this->loadTemplate("@PrestaShop/Admin/layout.html.twig", "@PrestaShop/Admin/Sell/Catalog/Stock/overview.html.twig", 25);
        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->leave($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof);

        
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->leave($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof);

    }

    // line 27
    public function block_stylesheets($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->enter($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "stylesheets"));

        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02 = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->enter($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "stylesheets"));

        // line 28
        echo "  ";
        $this->displayParentBlock("stylesheets", $context, $blocks);
        echo "
  <link rel=\"stylesheet\" href=\"";
        // line 29
        echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\AssetExtension']->getAssetUrl((("themes/new-theme/public/stock_page" . (isset($context["rtl_suffix"]) || array_key_exists("rtl_suffix", $context) ? $context["rtl_suffix"] : (function () { throw new RuntimeError('Variable "rtl_suffix" does not exist.', 29, $this->source); })())) . ".css")), "html", null, true);
        echo "\" type=\"text/css\" media=\"all\">
";
        
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->leave($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof);

        
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->leave($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof);

    }

    // line 32
    public function block_content($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->enter($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "content"));

        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02 = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->enter($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "content"));

        // line 33
        echo "    ";
        if ((isset($context["is_shop_context"]) || array_key_exists("is_shop_context", $context) ? $context["is_shop_context"] : (function () { throw new RuntimeError('Variable "is_shop_context" does not exist.', 33, $this->source); })())) {
            // line 34
            echo "        <div id=\"stock-app\"></div>
    ";
        } else {
            // line 36
            echo "        <div class=\"alert alert-danger\" role=\"alert\">
            <p class=\"alert-text\">";
            // line 37
            echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\TranslationExtension']->trans("Note that this page is available in a single shop context only. Switch context to work on it.", [], "Admin.Notifications.Info"), "html", null, true);
            echo "</p>
        </div>
    ";
        }
        
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->leave($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof);

        
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->leave($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof);

    }

    // line 42
    public function block_javascripts($context, array $blocks = [])
    {
        $macros = $this->macros;
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e = $this->extensions["Symfony\\Bundle\\WebProfilerBundle\\Twig\\WebProfilerExtension"];
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->enter($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "javascripts"));

        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02 = $this->extensions["Symfony\\Bridge\\Twig\\Extension\\ProfilerExtension"];
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->enter($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof = new \Twig\Profiler\Profile($this->getTemplateName(), "block", "javascripts"));

        // line 43
        echo "
    ";
        // line 44
        if ((isset($context["is_shop_context"]) || array_key_exists("is_shop_context", $context) ? $context["is_shop_context"] : (function () { throw new RuntimeError('Variable "is_shop_context" does not exist.', 44, $this->source); })())) {
            // line 45
            echo "        ";
            $this->displayParentBlock("javascripts", $context, $blocks);
            echo "

        ";
            // line 47
            $context["productId"] = ((twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["app"]) || array_key_exists("app", $context) ? $context["app"] : (function () { throw new RuntimeError('Variable "app" does not exist.', 47, $this->source); })()), "request", [], "any", false, false, false, 47), "query", [], "any", false, false, false, 47), "get", [0 => "productId"], "method", false, false, false, 47)) ? (twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["app"]) || array_key_exists("app", $context) ? $context["app"] : (function () { throw new RuntimeError('Variable "app" does not exist.', 47, $this->source); })()), "request", [], "any", false, false, false, 47), "query", [], "any", false, false, false, 47), "get", [0 => "productId"], "method", false, false, false, 47)) : (false));
            // line 48
            echo "        <script>
            var data = {
                baseUrl: '";
            // line 50
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["app"]) || array_key_exists("app", $context) ? $context["app"] : (function () { throw new RuntimeError('Variable "app" does not exist.', 50, $this->source); })()), "request", [], "any", false, false, false, 50), "getBasePath", [], "method", false, false, false, 50), "html", null, true);
            echo "',
                catalogUrl: '";
            // line 51
            echo $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getUrl("admin_product_catalog");
            echo "',
                stockUrl: '";
            // line 52
            echo $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getUrl("admin_stock_overview");
            echo "',
                stockExportUrl: '";
            // line 53
            echo $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getUrl("api_stock_list_products_export");
            echo "',
                stockImportUrl: '";
            // line 54
            echo $this->extensions['PrestaShopBundle\Twig\RawPurifiedExtension']->rawPurifier($this->extensions['PrestaShopBundle\Twig\LayoutExtension']->getAdminLink("AdminImport"));
            echo "',
                apiStockUrl: '";
            // line 55
            (((isset($context["productId"]) || array_key_exists("productId", $context) ? $context["productId"] : (function () { throw new RuntimeError('Variable "productId" does not exist.', 55, $this->source); })())) ? (print (twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getUrl("api_stock_list_product_combinations", ["productId" => (isset($context["productId"]) || array_key_exists("productId", $context) ? $context["productId"] : (function () { throw new RuntimeError('Variable "productId" does not exist.', 55, $this->source); })())]), "html", null, true))) : (print ($this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getUrl("api_stock_list_products"))));
            echo "',
                apiMovementsUrl: '";
            // line 56
            (((isset($context["productId"]) || array_key_exists("productId", $context) ? $context["productId"] : (function () { throw new RuntimeError('Variable "productId" does not exist.', 56, $this->source); })())) ? (print (twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getUrl("api_stock_product_list_movements", ["productId" => (isset($context["productId"]) || array_key_exists("productId", $context) ? $context["productId"] : (function () { throw new RuntimeError('Variable "productId" does not exist.', 56, $this->source); })())]), "html", null, true))) : (print ($this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getUrl("api_stock_list_movements"))));
            echo "',
                employeesUrl: '";
            // line 57
            echo $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getUrl("api_stock_list_movements_employees");
            echo "',
                suppliersUrl: '";
            // line 58
            echo $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getUrl("api_stock_list_suppliers");
            echo "',
                categoriesUrl: '";
            // line 59
            echo $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getUrl("api_stock_list_categories");
            echo "',
                movementsTypesUrl: '";
            // line 60
            echo $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getUrl("api_stock_list_movements_types", ["grouped" => true]);
            echo "',
                translationUrl: '";
            // line 61
            echo $this->extensions['Symfony\Bridge\Twig\Extension\RoutingExtension']->getUrl("api_i18n_translations_list", ["page" => "stock"]);
            echo "',
                locale: '";
            // line 62
            echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, (isset($context["app"]) || array_key_exists("app", $context) ? $context["app"] : (function () { throw new RuntimeError('Variable "app" does not exist.', 62, $this->source); })()), "request", [], "any", false, false, false, 62), "locale", [], "any", false, false, false, 62), "html", null, true);
            echo "'
            }
        </script>

        ";
            // line 66
            if ((isset($context["webpack_server"]) || array_key_exists("webpack_server", $context) ? $context["webpack_server"] : (function () { throw new RuntimeError('Variable "webpack_server" does not exist.', 66, $this->source); })())) {
                // line 67
                echo "            <script src=\"http://localhost:8080/stock.bundle.js\"></script>
        ";
            } else {
                // line 69
                echo "            <script src=\"";
                echo twig_escape_filter($this->env, $this->extensions['Symfony\Bridge\Twig\Extension\AssetExtension']->getAssetUrl("themes/new-theme/public/stock.bundle.js"), "html", null, true);
                echo "\"></script>
        ";
            }
            // line 71
            echo "    ";
        }
        // line 72
        echo "
";
        
        $__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02->leave($__internal_319393461309892924ff6e74d6d6e64287df64b63545b994e100d4ab223aed02_prof);

        
        $__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e->leave($__internal_085b0142806202599c7fe3b329164a92397d8978207a37e79d70b8c52599e33e_prof);

    }

    public function getTemplateName()
    {
        return "@PrestaShop/Admin/Sell/Catalog/Stock/overview.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  218 => 72,  215 => 71,  209 => 69,  205 => 67,  203 => 66,  196 => 62,  192 => 61,  188 => 60,  184 => 59,  180 => 58,  176 => 57,  172 => 56,  168 => 55,  164 => 54,  160 => 53,  156 => 52,  152 => 51,  148 => 50,  144 => 48,  142 => 47,  136 => 45,  134 => 44,  131 => 43,  121 => 42,  107 => 37,  104 => 36,  100 => 34,  97 => 33,  87 => 32,  75 => 29,  70 => 28,  60 => 27,  37 => 25,);
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
{% extends '@PrestaShop/Admin/layout.html.twig' %}

{% block stylesheets %}
  {{ parent() }}
  <link rel=\"stylesheet\" href=\"{{ asset('themes/new-theme/public/stock_page' ~ rtl_suffix ~ '.css') }}\" type=\"text/css\" media=\"all\">
{% endblock %}

{% block content %}
    {% if is_shop_context %}
        <div id=\"stock-app\"></div>
    {% else %}
        <div class=\"alert alert-danger\" role=\"alert\">
            <p class=\"alert-text\">{{ 'Note that this page is available in a single shop context only. Switch context to work on it.'|trans({}, 'Admin.Notifications.Info') }}</p>
        </div>
    {% endif %}
{% endblock %}

{% block javascripts %}

    {% if is_shop_context %}
        {{ parent() }}

        {% set productId = app.request.query.get('productId') ? app.request.query.get('productId') : false %}
        <script>
            var data = {
                baseUrl: '{{ app.request.getBasePath() }}',
                catalogUrl: '{{ url('admin_product_catalog') }}',
                stockUrl: '{{ url('admin_stock_overview') }}',
                stockExportUrl: '{{ url('api_stock_list_products_export') }}',
                stockImportUrl: '{{ getAdminLink('AdminImport')|raw_purified }}',
                apiStockUrl: '{{ productId ? url('api_stock_list_product_combinations', {'productId' : productId}) : url('api_stock_list_products') }}',
                apiMovementsUrl: '{{ productId ? url('api_stock_product_list_movements', {'productId' : productId}) : url('api_stock_list_movements') }}',
                employeesUrl: '{{ url('api_stock_list_movements_employees') }}',
                suppliersUrl: '{{ url('api_stock_list_suppliers') }}',
                categoriesUrl: '{{ url('api_stock_list_categories') }}',
                movementsTypesUrl: '{{ url('api_stock_list_movements_types', {'grouped': true}) }}',
                translationUrl: '{{ url('api_i18n_translations_list', {'page' : 'stock'}) }}',
                locale: '{{ app.request.locale }}'
            }
        </script>

        {% if webpack_server %}
            <script src=\"http://localhost:8080/stock.bundle.js\"></script>
        {% else %}
            <script src=\"{{ asset('themes/new-theme/public/stock.bundle.js') }}\"></script>
        {% endif %}
    {% endif %}

{% endblock %}
", "@PrestaShop/Admin/Sell/Catalog/Stock/overview.html.twig", "D:\\prog\\eval\\eval_n1\\prestashop\\src\\PrestaShopBundle\\Resources\\views\\Admin\\Sell\\Catalog\\Stock\\overview.html.twig");
    }
}
