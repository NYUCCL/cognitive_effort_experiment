# exp4 has four games of task
# each with random counterbalance (0-47),
# and one of four conditions (0,1,2,3),
# which define the rule and bonus value

import random

random.seed(30)

n_conditions = 4
n_counterbalances = 48

n_sequences = 10 # how many different orderings of the conditions and counterbalancing to create 

conds = [0]*n_sequences
cbs = [0]*n_sequences

for i in range(n_sequences):
    conds[i] = random.sample(range(n_conditions),n_conditions)
    cbs[i] = random.sample(range(n_counterbalances),n_conditions)
    
print(conds)
print(cbs)