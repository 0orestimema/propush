<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let newProject = $state(false);
	let editMode = $state(NaN);

	let { data }: PageProps = $props();
	let { projects } = $derived(data);

	// $effect(() => console.log(projects));
</script>

<main>
	<h1 class="text-center text-4xl">Pro-<b>Push</b></h1>
	<div class="mx-auto grid max-w-6xl grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
		<div class="flex h-64 flex-col items-center justify-center text-2xl font-bold">
			{#if newProject == false}
				<button type="button" onclick={() => (newProject = true)}> New + </button>
			{:else}
				<form
					method="POST"
					use:enhance={() => {
						newProject = false;
					}}
					action="?/post"
					class="flex grow flex-col justify-between"
				>
					<label for="title">Title: </label>
					<input type="text" name="title" id="title" />
					<label for="desc">Notes: </label>
					<textarea name="desc" id="desc" rows="3"></textarea>
					<button type="submit">Start Project.</button>
				</form>
			{/if}
		</div>
		{#each projects as project (project.id)}
			<div class="flex h-64 grow flex-col items-center justify-evenly text-2xl font-bold">
				{#if editMode != project.id}
					<h2>
						{project.title}
					</h2>
					<p class="text-xl">
						{project.description}
						<button class="text-xs" onclick={() => (editMode = project.id)}>_edit</button>
					</p>
					{#if project.completed}
						✔
					{:else}
						<form class="text-xs" method="POST" action="?/update" use:enhance>
							<input type="hidden" name="id" value={project.id} />
							<input type="hidden" name="c" value="true" />
							<button type="submit">Mark as completed</button>
						</form>
					{/if}
				{:else}
					<form
						method="POST"
						action="?/update"
						use:enhance={() => {
							editMode = NaN;
						}}
						class="flex grow flex-col justify-between"
					>
						<input type="hidden" name="id" value={project.id} />
						<label for="title">Title: </label>
						<input type="text" name="title" id="title" value={project.title} />
						<label for="desc">Notes: </label>
						<textarea name="desc" id="desc" rows="3" value={project.description}></textarea>
						<button type="submit">Save</button>
					</form>
				{/if}
			</div>
		{/each}
	</div>
</main>

<style lang="scss">
	button {
		cursor: pointer;
	}
</style>
