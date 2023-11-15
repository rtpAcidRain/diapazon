import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

const InsertTippy = () => {
    const tip = tippy('[data-tippy-content]', {
        animation: 'fade',
        placement: 'bottom',
        allowHTML: true,
    });

    
    return tip
}

export default InsertTippy