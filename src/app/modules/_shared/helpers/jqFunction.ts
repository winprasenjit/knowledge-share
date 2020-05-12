declare var $: any;

export class JqFunction {
    static createSelectDropdown(selector: string) {
        $(selector).select2({ selectOnClose: true }).trigger('change');
    }
}
