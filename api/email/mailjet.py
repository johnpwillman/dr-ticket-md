from mailjet_rest import Client
import os

###################################################
# https://github.com/mailjet/mailjet-apiv3-python #
###################################################

SANDBOX_MODE = True

def send(to_addrs, subject, from_addr, text_part, html_part):
  api_key = os.getenv('MAILJET_API_KEY', '')
  api_secret = os.getenv('MAILJET_SECRET_KEY', '')
  mailjet = Client(auth=(api_key, api_secret), version='v3.1')

  data = {
    'Messages': [
      {
        "From": format_email_dict(from_addr),
        "To": format_email_list(to_addrs),
        "Subject": subject,
        "TextPart": text_part,
        "HTMLPart": html_part,
      }
    ],
    #'SandboxMode': SANDBOX_MODE
  }
  result = mailjet.send.create(data=data)
  print(result.status_code)
  print(result.json())

def format_email_dict(email_dict):
  return {k.title():v for (k,v) in email_dict.items()}

def format_email_list(email_list):
  return [format_email_dict(email_dict) for email_dict in email_list]