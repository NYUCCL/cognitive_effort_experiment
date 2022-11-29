# this file imports custom routes into the experiment server
from __future__ import generator_stop
from flask import Blueprint, render_template, request, jsonify, Response, abort, current_app
from jinja2 import TemplateNotFound
from functools import wraps
from sqlalchemy import or_
from collections import Counter # used in custom counterbalancing
from random import choice # used in custom counterbalancing
import datetime # used in counterbalancing

from psiturk.psiturk_config import PsiturkConfig
from psiturk.psiturk_statuses import *
from psiturk.experiment_errors import ExperimentError, InvalidUsageError # InvalidUsageError #depending on psiturk version
from psiturk.user_utils import PsiTurkAuthorization, nocache

# # Database setup
from psiturk.db import db_session, init_db
from psiturk.models import Participant
from json import dumps, loads

# from stimuligenerator import task_gen

import numpy as np

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
# example custom route
#----------------------------------------------
# @custom_code.route('/my_custom_view')
# def my_custom_view():
#     # Print message to server.log for debugging
#     current_app.logger.info("Reached /my_custom_view")
#     try:
#         return render_template('custom.html')
#     except TemplateNotFound:
#         abort(404)

#----------------------------------------------
# example using HTTP authentication
#----------------------------------------------
# @custom_code.route('/my_password_protected_route')
# @myauth.requires_auth
# def my_password_protected_route():
#     try:
#         return render_template('custom.html')
#     except TemplateNotFound:
#         abort(404)

#----------------------------------------------
# example accessing data
#----------------------------------------------
# @custom_code.route('/view_data')
# @myauth.requires_auth
# def list_my_data():
#     users = Participant.query.all()
#     try:
#         return render_template('list.html', participants=users)
#     except TemplateNotFound:
#         abort(404)

#----------------------------------------------
# example computing bonus
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

#----------------------------------------------
# custom condition counterbalancing
#----------------------------------------------
# NOTE: dont need custom condition counterbalancing anymore (want to run new )

# def custom_get_condition(mode):
#     current_app.logger.info("accessing method /custom_get_condition")
#     """
#     HITs can be in one of three states:
#         - jobs that are finished
#         - jobs that are started but not finished
#         - jobs that are never going to finish (user decided not to do it)
#     Our count should be based on the first two, so we count any tasks finished
#     or any tasks not finished that were started in the last cutoff_time
#     minutes, as specified in the cutoff_time variable in the config file.
#     Returns a tuple: (cond, condition)
#     """
#     cutofftime = datetime.timedelta(minutes=-config.getint('Task Parameters',
#                                                            'cutoff_time'))
#     starttime = datetime.datetime.now(datetime.timezone.utc) + cutofftime

#     #removed the try except wrapper here that allows usage of conditions.json bc i don't need it
#     numconds = config.getint('Task Parameters', 'num_conds')
#     numcounts = config.getint('Task Parameters', 'num_counters')

#     participants = Participant.query.\
#         filter(Participant.mode == mode).\
#         filter(or_(Participant.status == COMPLETED,
#                    Participant.status == CREDITED,
#                    Participant.status == SUBMITTED,
#                    Participant.status == BONUSED,
#                    Participant.beginhit > starttime)).all()
#     counts = Counter()
#     for cond in range(numconds):
#         for counter in range(numcounts):
#             counts[(cond, counter)] = 0
#     for participant in participants:
#         condcount = (participant.cond, participant.counterbalance)
#         if condcount in counts:
#             counts[condcount] += 1
#     mincount = min(counts.values())
#     minima = [hsh for hsh, count in counts.items() if count == mincount]
#     chosen = choice(minima)
#     current_app.logger.info("given %(a)s chose %(b)s" % {'a': counts, 'b': chosen})

#     return chosen
