<script lang="ts">
    import type {PageData} from './$types';

    export let data:PageData
    const user = data.user;

</script>
<div class="container">
    <h2>
        Content Management
    </h2>
    <h3>Hello {user.name}</h3>
</div>
