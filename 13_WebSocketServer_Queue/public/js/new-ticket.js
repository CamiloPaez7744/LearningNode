

const currentTicketLabel = document.querySelector('span');
const createTicketButton = document.querySelector('button');

async function getLastTicket() {
    const lastTicket = await fetch('/api/tickets/last').then(res => res.json());

    currentTicketLabel.innerText = lastTicket;
    console.log(lastTicket);
}

async function createTicket() {
    const newTicket = await fetch('/api/tickets/',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json());

    currentTicketLabel.innerText = newTicket.number;
    console.log(newTicket);
}

createTicketButton.addEventListener('click', createTicket);

getLastTicket();

