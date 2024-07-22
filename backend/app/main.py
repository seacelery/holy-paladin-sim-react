import sys
import os
import json
from dotenv import load_dotenv

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import pprint

from app.classes.simulation import Simulation
from app.classes.paladin import Paladin
from app.classes.target import Target, BeaconOfLight
from app.utils import cache, battlenet_api

pp = pprint.PrettyPrinter(width=200)

load_dotenv()

client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")
access_token = battlenet_api.get_access_token(client_id, client_secret)

def save_data_to_file(data, filename):
    with open(filename, "w") as f:
        json.dump(data, f, indent=4)

def import_character(character_name, realm, region, version):    
    character_data = cache.cached_get_character_data(access_token, realm, character_name, region)
    stats_data = cache.cached_get_stats_data(access_token, character_data["statistics"]["href"])
    equipment_data = cache.cached_get_equipment_data(access_token, character_data["equipment"]["href"])
    talent_data = cache.cached_get_talent_data(access_token, realm, character_name, region)
    
    healing_targets = [Target(f"target{i + 1}") for i in range(20)]
    
    paladin = Paladin(character_name, character_data, stats_data, talent_data=talent_data, equipment_data=equipment_data, potential_healing_targets=healing_targets, version=version)
    
    return paladin, healing_targets
    
def initialise_simulation(paladin, healing_targets, encounter_length, iterations, time_warp_time, priority_list=None, custom_equipment=None, tick_rate=None, raid_health=None, mastery_effectiveness=None, light_of_dawn_targets=None, lights_hammer_targets=None, resplendent_light_targets=None, sureki_zealots_insignia_count=None, dawnlight_targets=None, suns_avatar_targets=None, light_of_the_martyr_uptime=None, potion_bomb_of_power_uptime=None, seasons=None, stat_scaling=None, overhealing=None, test=False):
    simulation = Simulation(paladin, healing_targets, encounter_length, iterations, time_warp_time, priority_list, custom_equipment, tick_rate, raid_health, mastery_effectiveness, light_of_dawn_targets, lights_hammer_targets, resplendent_light_targets, sureki_zealots_insignia_count, dawnlight_targets, suns_avatar_targets, light_of_the_martyr_uptime, potion_bomb_of_power_uptime, seasons, stat_scaling, overhealing, access_token, test)
    return simulation

def fetch_updated_data(paladin):
    return paladin
    
def run_simulation(simulation):
    return simulation.display_results()