import ReactDOMServer from 'react-dom/server';
import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

import route from 'ziggy-js';
import { Ziggy } from './ziggy'; // hasil generate ziggy

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
        setup: ({ App, props }) => {
            global.route = (name, params, absolute) =>
                route(name, params, absolute, {
                    ...Ziggy,
                    location: new URL(Ziggy.location),
                });

            return <App {...props} />;
        },
    })
);
