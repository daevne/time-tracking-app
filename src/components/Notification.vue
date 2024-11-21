<template>
    <div class="row justify-content-center">
        <div class="col-12 col-lg-6">
            <div v-if="isVisible" class="alert shadow-sm rounded border-0" :class="alertClass" role="alert">
                {{ message }}
            </div>
        </div>
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

