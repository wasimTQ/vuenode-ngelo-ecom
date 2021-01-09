<template>
    <div>
        <div>
            <h2>Short By </h2>
            <input type="text">
        </div>
        <div>
            <h2>Price Range: </h2>
            <div class="flex gap-x-4">
                <div>
                    <label for="min">Min</label>
                    <input type="text" id="min" placeholder="eg. 10">
                </div>
                <div>
                    <label for="max">Max</label>
                    <input type="text" id="max" placeholder="eg. 20">
                </div>
            </div>
        </div>
        <div>
            <h2>Rating</h2>
            <input type="number" class="w-1/6">
        </div>
    </div>
</template>

<style lang="scss" scoped>
h2{
    font-weight: bold;
    margin-top: 1rem;
}
input{
    width: 100%;
    padding: .75rem 1.5rem;
    outline: none;
    @apply bg-green-800;
}
input[type="number"]{
    
    @apply w-1/4;
}
</style>