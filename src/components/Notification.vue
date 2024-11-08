<template>
    <div v-if="isVisible" class="alert" :class="alertType" role="alert">
        {{ message }}
    </div>
</template>
    
<script>
    export default {
        name: 'NotificationAlert',
        props: {
            message: {
                type: String,
                required: true
            },
            type: {
                type: String,
                default: 'success'
            }
        },
        data() {
            return {
                isVisible: true
            };
        },
        computed: {
            alertType() {
                console.log(this.type);
                return {
                    success: 'alert-success',
                    danger: 'alert-danger',
                    info: 'alert-info'
                    }[this.type];
            }
        },
        mounted() {
            setTimeout(() => {
                this.isVisible = false;
            }, 3000);
        },
        watch: {
            message() {
                this.isVisible = true;
                setTimeout(() => {
                    this.isVisible = false;
                }, 3000);
            }
        }
    };
</script>

