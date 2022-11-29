# this file imports custom routes into the experiment server
from __future__ import generator_stop
from flask import Blueprint, render_template, request, jsonify, Response, abort, current_app
from jinja2 import TemplateNotFound
from functools import wraps
from sqlalchemy import or_

from psiturk.psiturk_config import PsiturkConfig
from psiturk.experiment_errors import ExperimentError, InvalidUsageError
from psiturk.user_utils import PsiTurkAuthorization, nocache

# # Database setup
from psiturk.db import db_session, init_db
from psiturk.models import Participant
from json import dumps, loads

from ruletext_generator import ruleToText

import numpy as np
import pandas as pd

# load the configuration options
config = PsiturkConfig()
config.load_config()
# myauth = PsiTurkAuthorization(config)  # if you want to add a password protect route use this

# explore the Blueprint
custom_code = Blueprint('custom_code', __name__, template_folder='templates', static_folder='static')

###########################################################
#  serving warm, fresh, & sweet custom, user-provided routes
#  add them here
###########################################################

#----------------------------------------------
# get text explanation of rule
#----------------------------------------------
@custom_code.route('/rule_to_text', methods=['GET'])
def rule_to_text():
    current_app.logger.info("accessing route /rule_to_text")
    rule = int(request.args['rule'])
    dimorder = int(request.args['dimorder'])
    dimvals = int(request.args['dimvals'])

    txt = ruleToText(rule, dimorder, dimvals)

    return jsonify(results=txt)

#----------------------------------------------
# computing bonus
#----------------------------------------------

@custom_code.route('/compute_bonus', methods=['GET'])
def compute_bonus():
    current_app.logger.info("accessing route /compute_bonus")
    # check that request includes a uniqueId
    if not 'uniqueId' in request.args:
        raise ExperimentError('improper_inputs')  # i don't like returning HTML to JSON requests...  maybe should change this
    uniqueId = request.args['uniqueId']
    try:
        # lookup user in database
        user = Participant.query.\
               filter(Participant.uniqueid == uniqueId).\
               one()
        user_data = loads(user.datastring) # load datastring from JSON
        bonus=0
        
        # CHANGES for multi-round game
        for record in user_data['data']: # for line in data file
            trial = record['trialdata'] # get part of line holding trial info
            if trial['phase'] == 'bonus':
                bonus = trial['bonus'] #get bonus as saved in data

        user.bonus = bonus
            
        db_session.add(user)
        db_session.commit() #commit to database
        resp = {"bonusComputed": "success"}
        return jsonify(**resp)
    except:
        abort(404)  # again, bad to display HTML, but...

