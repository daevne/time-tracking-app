<template>
    <div v-if="isVisible" class="alert" :class="alertClass" role="alert">
        {{ message }}
    </div>
</template>
    
<script>
    const ALERT_DISPLAY_TIME = 3000;
    const ALERT_CLASSES = {
        success: 'alert-success',
        danger: 'alert-danger',
        info: 'alert-info'
    };

    export default {
        name: 'NotificationAlert',
        props: {
            message: {
                type: String,
                required: true
            },
            alertType: {
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
            alertClass() {
                return ALERT_CLASSES[this.alertType];
            }
        },
        mounted() {
            this.hideAlertAfterTimeout();
        },
        watch: {
            message() {
                this.isVisible = true;
                this.hideAlertAfterTimeout();
            }
        },
        methods: {
            hideAlertAfterTimeout() {
                setTimeout(() => {
                    this.isVisible = false;
                }, ALERT_DISPLAY_TIME);
            }
        }
    };
</script>

