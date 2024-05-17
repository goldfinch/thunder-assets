<?php

namespace Goldfinch\ThunderAssets\Providers;

use Swordfox\Vite\Helpers\Vite;
use Goldfinch\ThunderAssets\Thunder;
use SilverStripe\View\TemplateGlobalProvider;
use SilverStripe\Core\Manifest\ModuleResourceLoader;

class ThunderTemplateProvider implements TemplateGlobalProvider
{
    public static function get_template_global_variables(): array
    {
        return [
            'ThunderAssets' => [
                'method' => 'ThunderAssets',
                'casting' => 'HTMLFragment'
            ]
        ];
    }

    public static function ThunderAssets()
    {
        $cfg = Thunder::config();

        $vite = Vite::create();

        $return = '';
        $returnAfter = PHP_EOL;
        $returnBefore = PHP_EOL;

        if ($cfg->get('registered_assets') && is_array($cfg->get('registered_assets'))) {

            foreach ($cfg->get('registered_assets') as $asset => $rule) {
                $type = null;
                $format = substr($asset, -5);

                if (strpos($format, '.scss') !== false) {
                    $type = 'css';
                } else if (strpos($format, '.css') !== false) {
                    $type = 'css';
                } else if (strpos($format, '.js') !== false) {
                    $type = 'js';
                } else if (strpos($format, '.ts') !== false) {
                    $type = 'js';
                }

                if ($type) {

                    if ($rule === true) {

                        if ($type == 'css') {
                            $return .= $vite->CSS($asset) . PHP_EOL . '    ';
                        } else {
                            $return .= $vite->JS($asset) . PHP_EOL . '    ';
                        }
                    } else {
                        $return .= '<meta name="thunder-asset" content="'.$vite->assetLink($asset).'" cloud="'.$rule.'">' . PHP_EOL . '    ';
                    }
                }
            }
        }

        $content = file_get_contents(BASE_PATH .'/'. ModuleResourceLoader::resourcePath('goldfinch/thunder-assets:client/dist/thunder.js'));

        if ($return != '') {
            // $return .= '<script data-cfasync="false" src="'.ModuleResourceLoader::resourceURL('goldfinch/thunder-assets:client/dist/thunder.js').'"></script>' . PHP_EOL . '    ';
            $return .= '<script data-cfasync="false">'.$content.'</script>' . PHP_EOL . '    ';
            $return .= '<script data-cfasync="false" type="thunder">window.thunder()</script>';

            if ($cfg->get('registered_font')) {
          	    $return .= '<link data-cfasync="false" rel="preload" as="style" href="'.$cfg->get('registered_font').'" fetchpriority="low" onload="this.rel=\'stylesheet\'">';
            }
        }

        return $returnBefore . $return . $returnAfter;
    }
}
