<script>
     /** @type {ConfigType} */
    export let config;
    export let name ='';
    export let title = config.name || name;
</script>

<div class="bg-gray-900 bg-opacity-50 text-cyan-400 border border-cyan-800 rounded-lg p-6 pt-3 shadow-md w-full h-full overflow-auto">
    <h2 class="text-base font-normal text-center uppercase tracking-wide mb-2">{title}</h2>
    <slot />
</div>

