async function setup() {
    const response = await fetch('/create-deposit-request', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();

    const mountElement = document.querySelector('#deposit');
    const token = data.token;

    if (window.RebillyCashier) {
        RebillyCashier.renderDeposit({
            mountElement,
            token,
        });
    } else {
        console.error('RebillyCashier library not loaded');
    }
}

setup();