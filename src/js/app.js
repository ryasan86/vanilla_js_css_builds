// prettier-ignore
const MONTH_NAMES = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', ];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function app() {
    return {
        MONTH_NAMES,
        DAYS,
        showDatepicker: false,
        datepickerValue: '',
        month: '',
        year: '',
        noOfDays: [],
        blankDays: [],
        days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

        handleInput: function ($event) {
            let value = this.datepickerValue.slice();
            const {inputType} = $event;

            if (value.length === 2 || value.length == 5) {
                if (inputType === 'insertText') {
                    value += '/';
                } else if (inputType === 'deleteContentBackward') {
                    value = value.slice(0, -1);
                }
            }

            this.datepickerValue = value;
        },

        initDate() {
            let today = new Date();
            this.month = today.getMonth();
            this.year = today.getFullYear();
            this.datepickerValue = new Date(this.year, this.month, today.getDate()).toLocaleDateString(); // prettier-ignore
        },

        isToday(date) {
            const today = new Date();
            const d = new Date(this.year, this.month, date);

            return today.toDateString() === d.toDateString() ? true : false;
        },

        getDateValue(date) {
            console.log(date);
            let selectedDate = new Date(this.year, this.month, date);
            this.datepickerValue = selectedDate.toLocaleDateString();

            // prettier-ignore
            this.$refs.date.value = selectedDate.getFullYear() + '-' + ('0' + selectedDate.getMonth()).slice(-2) + '-' + ('0' + selectedDate.getDate()).slice(-2);
            console.log(this.$refs.date.value);

            this.showDatepicker = false;
        },

        getNoOfDays() {
            let daysInMonth = new Date(this.year, this.month + 1, 0).getDate();

            // find where to start calendar day of week
            let dayOfWeek = new Date(this.year, this.month).getDay();
            let blankDaysArray = [];
            for (var i = 1; i <= dayOfWeek; i++) {
                blankDaysArray.push(i);
            }

            let daysArray = [];
            for (var i = 1; i <= daysInMonth; i++) {
                daysArray.push(i);
            }

            this.blankDays = blankDaysArray;
            this.noOfDays = daysArray;
        },
    };
}

window.app = app;
