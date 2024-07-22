import sys
import pprint
import json

from flask import Blueprint, request, jsonify, session
from app.main import import_character, run_simulation, initialise_simulation
from app.socketio_setup import socketio
from flask_socketio import emit
from app.classes.simulation_state import cancel_simulation

main = Blueprint("main", __name__)
pp = pprint.PrettyPrinter(width=200)

default_priority_list = [
    ("Holy Shock | Holy Shock charges = 2"),
    ("Arcane Torrent | Race = Blood Elf"),
    ("Judgment | Infusion of Light duration < 5"),
]

@socketio.on("my event")
def handle_my_custom_event(json):
    print("received json: " + str(json))
    emit("my response", {"data": "got it!"})

def log_session_size():
    session_keys_count = len(session.keys())
    print(f"Session contains {session_keys_count} keys")
    
    # not compatible with pypy
    # session_size = sys.getsizeof(str(session))
    # print(f"Session size: {session_size} bytes")
    
@main.route("/cancel_simulation", methods=["POST"])
def cancel_simulation_route():
    print("Cancel simulation route hit")
    cancel_simulation()
    return jsonify({"message": "Simulation cancellation requested."})

@main.route("/import_character", methods=["GET"])
def import_character_route():
    session.clear()
    character_name = request.args.get("character_name")
    realm = request.args.get("realm")
    region = request.args.get("region")
    version = request.args.get("version")

    paladin, healing_targets = import_character(character_name, realm, region, version)
    
    session["character_name"] = character_name
    session["realm"] = realm
    session["region"] = region
    session["version"] = version
    
    session["modifiable_data"] = {"class_talents": {}, "spec_talents": {}, "lightsmith_talents": {}, "herald_of_the_sun_talents": {}, "race": "", "consumables": {}, "equipment": {}}
    print(session["modifiable_data"])

    return jsonify({
        "message": f"Character imported successfully, {character_name}, {realm}, {region}",
        "character_name": character_name,
        "character_realm": realm,
        "character_region": region,
        "class_talents": paladin.class_talents,
        "spec_talents": paladin.spec_talents,
        "race": paladin.race,
        "consumable": paladin.consumables,
        "equipment": paladin.equipment,
        "stats": {"haste": round(paladin.haste_rating), "crit": round(paladin.crit_rating), "mastery": round(paladin.mastery_rating), "versatility": round(paladin.versatility_rating), 
                  "intellect": round(paladin.spell_power), "health": round(paladin.max_health), "leech": round(paladin.leech_rating), "mana": round(paladin.max_mana),
                  "haste_percent": round(paladin.haste, 2), "crit_percent": round(paladin.crit, 2), "mastery_percent": round(paladin.mastery, 2), 
                  "versatility_percent": round(paladin.versatility, 2), "leech_percent": round(paladin.leech, 2)},
        "ptr": paladin.ptr
    })
    
@main.route("/fetch_updated_data", methods=["GET"])
def fetch_updated_stats_route():
    character_name = request.args.get("character_name")
    realm = request.args.get("realm")
    region = request.args.get("region")
    custom_equipment = request.args.get("custom_equipment")
    version = request.args.get("version")

    paladin, healing_targets = import_character(character_name, realm, region, version)
    modifiable_data = session.get("modifiable_data", {})
    paladin.update_character(
        race=modifiable_data.get("race"),
        class_talents=modifiable_data.get("class_talents"),
        spec_talents=modifiable_data.get("spec_talents"),
        lightsmith_talents=modifiable_data.get("lightsmith_talents"),
        herald_of_the_sun_talents=modifiable_data.get("herald_of_the_sun_talents"),
        consumables=modifiable_data.get("consumables")
    )

    paladin.update_equipment(custom_equipment)
    
    return jsonify({
        "message": f"Character imported successfully, {character_name}, {realm}, {region}",
        "character_name": character_name,
        "character_realm": realm,
        "character_region": region,
        "class_talents": paladin.class_talents,
        "spec_talents": paladin.spec_talents,
        "race": paladin.race,
        "consumable": paladin.consumables,
        "equipment": paladin.equipment,
        "stats": {"haste": round(paladin.haste_rating), "crit": round(paladin.crit_rating), "mastery": round(paladin.mastery_rating), "versatility": round(paladin.versatility_rating), 
                  "intellect": round(paladin.spell_power), "health": round(paladin.max_health), "leech": round(paladin.leech_rating), "mana": round(paladin.max_mana),
                  "haste_percent": round(paladin.haste, 2), "crit_percent": round(paladin.crit, 2), "mastery_percent": round(paladin.mastery, 2), 
                  "versatility_percent": round(paladin.versatility, 2), "leech_percent": round(paladin.leech, 2)},
        "ptr": paladin.ptr
    })

@main.route("/update_character", methods=["POST"])
def update_character_route():
    user_input = request.json
    print("User Input:", user_input)
    modifiable_data = session.get("modifiable_data", {})
    
    if "class_talents" in user_input:
        for talent, value in user_input["class_talents"].items():
            modifiable_data["class_talents"][talent] = value

    if "spec_talents" in user_input:
        for talent, value in user_input["spec_talents"].items():
            modifiable_data["spec_talents"][talent] = value
            
    if "lightsmith_talents" in user_input:
        for talent, value in user_input["lightsmith_talents"].items():
            modifiable_data["lightsmith_talents"][talent] = value
            
    if "herald_of_the_sun_talents" in user_input:
        for talent, value in user_input["herald_of_the_sun_talents"].items():
            modifiable_data["herald_of_the_sun_talents"][talent] = value
            
    for item in user_input:
        if item not in ["class_talents", "spec_talents", "lightsmith_talents", "herald_of_the_sun_talents"]:
            modifiable_data[item] = user_input[item]
            
    print(modifiable_data)
    session["modifiable_data"] = modifiable_data
    log_session_size()

    return jsonify({"message": "Character updated successfully"})

@main.route("/run_simulation", methods=["GET"])
def run_simulation_route():
    character_name = session.get("character_name")
    realm = session.get("realm")
    region = session.get("region")
    version = session.get("version")

    if not character_name or not realm:
        return jsonify({"error": "Character name or realm not found in session"}), 400

    encounter_length = request.args.get("encounter_length", default=60, type=int)
    iterations = request.args.get("iterations", default=1, type=int)
    time_warp_time = request.args.get("time_warp_time", default=0, type=int)
    priority_list_json = request.args.get("priority_list", default="")
    custom_equipment = request.args.get("custom_equipment")
    tick_rate = request.args.get("tick_rate")
    raid_health = request.args.get("raid_health")
    mastery_effectiveness = request.args.get("mastery_effectiveness")
    light_of_dawn_targets = request.args.get("light_of_dawn_targets")
    lights_hammer_targets = request.args.get("lights_hammer_targets")
    resplendent_light_targets = request.args.get("resplendent_light_targets")
    sureki_zealots_insignia_count = request.args.get("sureki_zealots_insignia_count")
    dawnlight_targets = request.args.get("dawnlight_targets")
    suns_avatar_targets = request.args.get("suns_avatar_targets")
    light_of_the_martyr_uptime = request.args.get("light_of_the_martyr_uptime")
    potion_bomb_of_power_uptime = request.args.get("potion_bomb_of_power_uptime")
    stat_scaling_json = request.args.get("stat_scaling")
    seasons_json = request.args.get("seasons")
    overhealing_json = request.args.get("overhealing")
    
    if priority_list_json:
        priority_list = json.loads(priority_list_json)
        
    if stat_scaling_json:
        stat_scaling = json.loads(stat_scaling_json)
        
    if seasons_json:
        seasons = json.loads(seasons_json)
        
    if overhealing_json:
        overhealing = json.loads(overhealing_json)

    paladin, healing_targets = import_character(character_name, realm, region, version)
    
    print(session["modifiable_data"])
    
    modifiable_data = session.get("modifiable_data", {})
    paladin.update_character(
        race=modifiable_data.get("race"),
        class_talents=modifiable_data.get("class_talents"),
        spec_talents=modifiable_data.get("spec_talents"),
        lightsmith_talents=modifiable_data.get("lightsmith_talents"),
        herald_of_the_sun_talents=modifiable_data.get("herald_of_the_sun_talents"),
        consumables=modifiable_data.get("consumables")
    )
        
    simulation = initialise_simulation(paladin, healing_targets, encounter_length, iterations, time_warp_time, priority_list, custom_equipment, tick_rate, raid_health, mastery_effectiveness, light_of_dawn_targets, lights_hammer_targets, resplendent_light_targets, sureki_zealots_insignia_count, dawnlight_targets, suns_avatar_targets, light_of_the_martyr_uptime, potion_bomb_of_power_uptime, seasons, stat_scaling, overhealing)

    # pp.pprint(paladin.class_talents)
    results = run_simulation(simulation)

    return jsonify(results)