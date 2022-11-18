import os

import mistune #markdown parser/renderer

if len(os.environ['MAILJET_API_KEY']) > 0:
    from . import mailjet as email
else:
    from . import fake as email

FROM = {"email": os.environ["VERIFIED_SENDER_EMAIL"]}

def send(to_addrs, subject, ticket_url, from_addr=FROM, update_body = None):
    try:
        text_part = f"""
            A ticket you are subscribed to has been updated.
            Ticket: {ticket_url}

            Update:
            {update_body}
        """
        html_part = f"""
            A ticket you are subscribed to has been updated.
            <p>Ticket: <a href="{ticket_url}">{ticket_url}</a></p>

            {mistune.html(update_body)}
        """
        email.send(to_addrs=to_addrs, subject=subject, from_addr=from_addr, text_part=text_part, html_part=html_part)
    except Exception as err:
        print(str(err))