console.clear();
//---------------------以下代码需要改动---------------------------------
const BAN = []//封禁列表（ID）
const NBplayer = []//管理员列表（填名字）
const VIP_player = ['墨小生', '白小生-USSR', '呆檬-CK工作室', '元七七']//VIP高级权限（填名字）
const ZUOZHE_NB = ['墨小生', '元七七']//作者高级权限（填名字）
const kjl = world.querySelector('#快捷栏');//菜单快捷栏名字
async function shout() {//公告
    while (true) {
        await sleep(60000);
        world.say('[系统]创造大陆为墨小生创作，CK工作室出品！');
        await sleep(60000)
        world.say('[系统]感谢白小生的部分代码支持！')
        await sleep(60000);
        world.say('[系统]本地图已安装反游客系统，游客886~');
        await sleep(60000);
        world.say('[系统]做文明玩家，请不要拆图Thanks♪(･ω･)ﾉ');
        await sleep(60000);
        world.say('[系统]想建铁路怎么办？选择传送带方块吧，不同方向可以使用方块旋转哦');
        await sleep(60000);
        world.say('[系统]如果遇到拆房，请联系管理员哦~');
        await sleep(60000);
        world.say('[系统]墨小生会把有意义的评论留言哦，请多多关注！');
        await sleep(60000);
        world.say('[系统]试试无限创造吧！');
        await sleep(60000);
        world.say('[系统]想成为管理员？找墨小生试试');
        await sleep(60000);
        world.say('[系统]我可以帮你，也可以ban你！');
        await sleep(60000);
        world.say('[系统]创造大陆包括岛三最全方块，部分还在更新中！');
    }

}
shout();
//----------------------以上代码需要改动---------------------------------
globalThis.dialog = (entity, title, content, options = ['确认']) => {
    return entity.player.dialog({
        type: Box3DialogType.SELECT,
        title: title,
        content: content,
        options: options
    })
}
world.say(`【创造大陆】创造大陆内核v2.3已载入`)
world.onPress(({ entity, button, raycast: { voxelIndex, normal } }) => {//监听按下去
    if (button == Box3ButtonType.ACTION1) { //如果是actionG,即电脑端的左键
        let v = voxelIndex.add(normal); //用点击到的坐标加上法向量，得到邻边
        for (let i = 1; i <= (entity.player.shuaQiang || 1); i++) {  // 刷墙，不想要可删
            let originalId = voxels.getVoxel(v.x, v.y, v.z), originalXuanZhuan = voxels.getVoxelRotation(v.x, v.y, v.z)
            voxels.setVoxel(v.x, v.y, v.z, entity.player.hand, (() => {
                if (!entity.player.autoRotate) return entity.player.xuanzhuang
                var direction = 0
                if (normal.x == 1) direction = 1
                if (normal.z == 1) direction = 2
                if (normal.x == -1) direction = 3
                if (normal.z == -1) direction = 4
                if (direction == 0) return entity.player.xuanzhuang
                switch (typeof entity.player.hand == 'number' ? voxels.name(entity.player.hand) : entity.player.hand) {
                    case 'television': return direction - 1
                    case 'conveyor': return direction > 3 ? direction - 4 : direction
                    case 'button': return direction - 1
                    case 'fan': return direction - 1
                    default: return entity.player.xuanzhuang
                }
            })());
            if (originalId != entity.player.hand) 
            v.addEq(normal)
            if (i >= 255) break
        }
    } else if (button == Box3ButtonType.ACTION0) { //如果是action1,对应电脑端右
        voxels.setVoxel(voxelIndex.x, voxelIndex.y, voxelIndex.z, 0);
    }
})
world.onPlayerJoin(({ entity }) => {
    entity.player.enable3DCursor = true;
})
// 先在场景中放置一个名称为 kjl 的实体。
kjl.enableInteract = true; // 允许进行互动
kjl.interactRadius = 100000000000000;   // 实体的互动范围
kjl.interactHint = '菜单'; // 互动提示框显示实体的名称
kjl.interactColor = new Box3RGBColor(1, 1, 1);  // 互动提示的文字颜色

world.onPlayerJoin(({ entity }) => {
    if (!entity.player.boxId) {
        entity.player.kick()
        world.say('[系统]众所周知，墨小生最讨厌的就是游客')
        world.say('[系统]所以，已自动拦截一名游客！')
    }
})
world.onPlayerJoin(({ entity }) => {
    if (!NBplayer.includes(entity.player.name)) return; // 如果玩家名称不在列表里，则跳过后续脚本。
    world.say(`管理员${entity.player.name}进入了地图!`)
    entity.player.directMessage('可以通过发送/指令帮助 查看管理员指令!')
})

world.onPlayerJoin(({ entity }) => {
    if (!VIP_player.includes(entity.player.name)) return; // 如果玩家名称不在列表里，则跳过后续脚本。
    world.say(`尊敬的VIP玩家 ${entity.player.name} 进入了创造大陆！欢迎━(*｀∀´*)ノ亻!`);
})


world.onPlayerJoin(({ entity }) => {
    if (!ZUOZHE_NB.includes(entity.player.name)) return; // 如果玩家名称不在列表里，则跳过后续脚本。
    world.say(`作者大大来了！`);
})





world.onPlayerJoin(({ entity }) => {
    if (!BAN.includes(entity.player.boxId)) return; // 如果玩家名称不在列表里，则跳过后续脚本。
    entity.player.kick()
    world.say('[系统]该玩家被永久封禁！所以踢出服务器！')
})






world.onPlayerJoin(({ entity }) => {
    entity.player.scale = 0.9;
    entity.player.shuaQiang = 1
})






world.onPlayerJoin(async ({ entity }) => {
    sceneScript = [
        {
            type: Box3DialogType.TEXT,
            title: '系统',
            content: `欢迎来到创造大陆！！！\n 在这里创造属于你的天地吧！`,//说话内容
            titleBackgroundColor: new Box3RGBAColor(0.968, 0.702, 0.392, 1),
            hasArrow: true,
        },
        {
            type: Box3DialogType.TEXT,
            title: '操作说明',
            content: `电脑端E键打开目录，手机端下蹲加B键！\n`,
            titleBackgroundColor: new Box3RGBAColor(0.968, 0.702, 0.392, 1),
        },
        {
            title: '公告',
            type: Box3DialogType.TEXT,
            content: `此地图使用创造大陆内核v2.3`,
            titleBackgroundColor: new Box3RGBAColor(0.968, 0.702, 0.392, 1),
            confirmText: '知道了！'
        },
    ];

    for (i = 0; i < sceneScript.length; i++) {
        const dialog = await entity.player.dialog(sceneScript[i]);
    }
});


world.onPlayerJoin(async ({ entity }) => {
    entity.player.canFly = true;
    entity.player.enable3DCursor = true;
    entity.player.things = 8;
    entity.player.hand = "dirt";
})

kjl.onInteract(async ({ entity }) => {
    menu(entity)
});


const voxel_1 = ['dirt', 'grass', 'stone', 'green_leaf', 'acacia', 'sand', 'snow', 'leaf_01', 'leaf_02', 'leaf_06', 'dark_grass', 'dark_stone', 'snowland', 'polar_region', 'polar_ice', 'blue_surface_01', 'blue_surface_02', 'purple_surface_01', 'purple_surface_02', 'dark_surface', 'rock', 'water', 'ice', 'windy_grass', 'yellow_grass', 'winter_leaf', 'leaf_03', 'leaf_04', 'leaf_05', 'honeycomb_01', 'honeycomb_02', 'white_grass', 'palm', 'pumpkin', 'spiderweb', 'bear_footprint', 'bamboo', 'wood', 'lava1', 'lava2'];
const voxel_2 = ['stained_glass', 'plank_01', 'plank_02', 'plank_03', 'plank_04', 'ice_brick', 'light_grey_stone_brick', 'grey_stone_brick', 'gold_trim_brick', 'red_brick', 'quartz_brick', 'window', 'cross_window', 'geometric_window_01', 'geometric_window_02', 'glass', 'color_glass', 'wooden_box', 'board_01', 'board_02', 'board_03', 'board_04', 'board_05', 'board_06', 'carpet_01', 'carpet_02', 'carpet_03', 'carpet_04', 'carpet_05', 'carpet_06', 'carpet_07', 'carpet_08', 'carpet_09', 'carpet_10', 'carpet_11', 'carpet_12', 'carpet_13', 'palace_eaves_01', 'palace_eaves_02', 'palace_eaves_03', 'palace_eaves_04', 'palace_eaves_05', 'palace_eaves_06', 'palace_eaves_07', 'palace_eaves_08', 'roof_red', 'roof_purple', 'roof_green', 'roof_blue_04', 'roof_yellow', 'stainless_steel', 'ice_wall', 'palace_roof', 'red_brick_floor', 'red_brick_wall', 'palace_floor', 'palace_carving', 'lantern_01', 'lantern_02', 'stone_pilar_05', 'stone_pilar_06', 'stone_wall', 'blue_glass', 'green_glass', 'black_glass', 'red_glass', 'greenbelt_L', 'greenbelt_L1', 'stone_brick_01', 'stone_brick_02', 'dark_brick_00', 'dark_brick_01', 'dark_brick_02', 'express_box', 'television', 'bookshelf', 'bat_window', 'pumpkin_lantern', 'red_gift', 'blue_gift', 'snowman_head', 'snowman_body', 'fu', 'traditional_window', 'rainbow_cube', 'firecracker', 'toolbox', 'treasure_chest'];
const voxel_3 = ['lantern_01', 'lantern_02', 'palace_lamp', 'crane_lantern', 'ledfloor01', 'ledfloor02', 'pumpkin_lanterm', 'star_lamp', 'snowflake_lamp', 'blue_decorative_light', 'green_decorative_light', 'red_decorative_light', 'yellow_decorative_light', 'lab_lamp_01', 'lab_lamp_02', 'lab_lamp_03', 'red_light', 'orange_light', 'yellow_light', 'green_light', 'indigo_light', 'blue_light', 'purple', 'pink_light', 'mint_green_light', 'white_light', 'warm_yellow_light'];
const voxel_4 = ['air_duct', 'button', 'fan', 'lab_lamp_01', 'lab_lamp_02', 'lab_lamp_03', 'lab_material_01', 'lab_material_02', 'lab_material_03', 'lab_material_04', 'lab_material_05', 'lab_material_06', 'lab_material_07', 'lab_material_08', 'lab_material_09', 'lab_material_10', 'lab_material_11', 'lab_material_12', 'lab_material_13', 'lab_material_14', 'lab_material_15', 'lab_screen', 'lab_wire', 'bounce_pad', 'conveyor'];
const voxel_5 = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'zero', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'add', 'subtract', 'multiply', 'divide', 'equal', 'exclamation_mark', 'question_mark', 'ampersand', 'asterisk', 'at', 'backslash', 'bracket_close', 'bracket_open', 'caret', 'colon', 'comma', 'dollar', 'greater_than', 'less_than', 'paren_open', 'paren_close', 'percent', 'period', 'pound', 'quotation_mark', 'semicolon', 'slash', 'tilde'];
const voxel_6 = ['pink_cake', 'macaroon', 'biscuit', 'strawberry_juice', 'lime_juice', 'blueberry_juice', 'lemon_juice', 'grape_juice', 'orange_juice', 'milk', 'soy_sauce', 'coffee', 'peach_juice', 'candy']



world.onPress(async ({ entity, button }) => {
    if (entity.player.walkState == Box3PlayerWalkState.CROUCH && button === Box3ButtonType.ACTION1) {
        await menu(entity)
    }
});

world.addCollisionFilter('player', 'player')


async function menu(entity) {
    const selection = await entity.player.dialog({
        type: Box3DialogType.SELECT,
        content: `请选择方块种类（含岛3全方块）`,
        options: ['切换视角', '大自然', '现代建筑', '古代建筑', '光源集合', '实验室', '数字与字母','符号','食品与饮料','颜色','棋盘','更多']
    })
    if (selection) {
        switch (selection.index) {
            case 0:
                if (entity.player.cameraMode == 'fps')
                    entity.player.cameraMode = 'follow';
                else
                    entity.player.cameraMode = 'fps';
                entity.player.directMessage('视角切换成功')
                break;
            case 1:
                selectionVoxel(entity, '', "请选择一个方块！", 'natural');
                break;
            case 2:
                selectionVoxel(entity, '', "请选择一个方块！", 'architecture');
                break;
            case 3:
                selectionVoxel(entity, '', "请选择一个方块！", 'palace');
                break;
            case 4:
                selectionVoxel(entity, '', "请选择一个方块！", 'light');
                break;
            case 5:
                selectionVoxel(entity, '', "请选择一个方块！", 'laboratory');
                break;
            case 6:
                selectionVoxel(entity, '', "请选择一个方块！", 'character');
                break;
            case 7:
                selectionVoxel(entity, '', "请选择一个方块！", 'symbol');
                break;
            case 8:
                selectionVoxel(entity, '', "请选择一个方块！", 'food');
                break;
            case 9:
                selectionVoxel(entity, '', "请选择一个方块！", 'color');
                break;
            case 10:
                selectionVoxel(entity, '', "请选择一个方块！", 'board');
                break;
            case 11:
                await settings(entity)
                break;


        }
    }
}


async function updatalogs(entity) {
    const log = await entity.player.dialog({
        type: Box3DialogType.TEXT,
        title: "更新日志",
        content: `beat 1.1 \n-加入亿点点管理员指令\n-增加VIP玩家，白小生＆呆檬是VIP\n \n beat 1.0 \n-加入管理员指令，管理员通过输入/指令帮助 来查看指令\n \n beat 0.9\n -加入小地图\n -加入更新日志\n \n beat 0.8\n -加入封禁系统，管理员使用‘进监狱+空格 +玩家姓名’封禁‘出监狱+空格+玩家姓名’解封\n -将玩家大小设置成0.9，可以轻松穿过2格高的洞\n-玩家不再掉入虚空内\n-加入旋转方块的功能（测试），建传送带 交通和地 铁不再是梦！\n-增加公告系统\n`,
    });

}

async function settings(entity) {
    const selection = await entity.player.dialog({
        type: Box3DialogType.SELECT,
        content: `更多`,
        options: ['地图创作端', '旋转方块', '更新日志', '小地图']
    })
    if (selection) {
        switch (selection.index) {
            case 0:
                entity.player.link('')
                break;
            case 1:
                await xuanzhuang(entity)
                break;
            case 2:
                await updatalogs(entity)
                break;
            case 3:
                await ditu(entity)
                break;


        }
    }
}


async function xuanzhuang(entity) {
    const selection = await entity.player.dialog({
        type: Box3DialogType.SELECT,
        content: `旋转方块的角度（太阳东升西落，在创造大陆也一样）`,
        options: ['北', '东', '南', '西']
    })
    if (selection) {
        switch (selection.index) {
            case 0:
                entity.player.xuanzhuang = 0
                break;
            case 1:
                entity.player.xuanzhuang = 1
                break;
            case 2:
                entity.player.xuanzhuang = 2
                break;
            case 3:
                entity.player.xuanzhuang = 3
                break;


        }
    }
}


async function shouchi(entity) {
    const selection = await entity.player.dialog({
        type: Box3DialogType.SELECT,
        content: `旋转方块的角度（太阳东升西落，在创造大陆也一样）`,
        options: ['北', '东', '南', '西']
    })
    if (selection) {
        switch (selection.index) {
            case 0:
                entity.player.xuanzhuang = 0
                break;
            case 1:
                entity.player.xuanzhuang = 1
                break;
            case 2:
                entity.player.xuanzhuang = 2
                break;
            case 3:
                entity.player.xuanzhuang = 3
                break;


        }
    }
}


async function voxelSel2(entity) {
    const sel1 = await entity.player.dialog({
        type: Box3DialogType.SELECT,
        content: "请选择一个方块！",
        options: ['泥土', '草', '石头', '绿叶', '树胶', '沙子', '雪块', '树叶_1', '树叶_2', '树叶_3', '深色草', '深色石头', '雪地', '极地', '北极冰', '星球蓝色_1', '星球蓝色_2', '星球紫色_1', '星球紫色_2', '星球紫色_3', '原石', '水', '冰块', '风中草', '黄色草', '冬日树叶', '树叶_1', '树叶_2', '树叶_3', '蜂巢1', '蜂巢2', '雪地', '棕榈树', '南瓜', '蜘蛛网', '被人踩过的方块（）', '竹子', '木头', '岩浆块_1', '岩浆块_2'],
    })
    if (sel1) {
        entity.player.hand = voxel_1[sel1.index]//sel1.value
    }
}

async function voxelSel1(entity) {
    const sel2 = await entity.player.dialog({
        type: Box3DialogType.SELECT,
        options: ['花色玻璃', '木板_1', '木板_2', '木板_3', '木板_4', '冰砖', '灰色石砖', '灰色石砖', '金边砖', '红砖', '石英砖', '双开形窗户', 'X形窗户', '窗花_1', '窗花_2', '玻璃', '彩色玻璃', '木盒', '木墙1', '木墙2', '木墙3', '木墙4', '木墙5', '木墙6', '黄色地毯', '蓝色地毯', '粉色地毯', '青色地毯', '宫殿的地毯_1', '宫殿的地毯_2', '宫殿的地毯_3', '黑色地毯', '蓝色地毯', '浅绿色地毯', '黄色地毯', '紫色地毯', '深红色地毯', '宫殿的屋檐_1', '宫殿的屋檐_2', '宫殿的屋檐_3', '宫殿的屋檐_4', '宫殿的屋檐_5', '宫殿的屋檐_6', '宫殿的屋檐_7', '宫殿的屋檐_8', '红色屋顶', '紫色屋顶', '绿色屋顶', '蓝色屋顶', '黄色屋顶', '不锈钢', '冰墙', '宫殿屋顶', '红砖地板', '红砖墙', '宫殿地板', '宫殿雕像', '石柱1', '石柱2', '石柱3', '石柱4', '石墙', '蓝色玻璃', '绿色玻璃', '黑色玻璃', '红色玻璃', '绿地1', '绿地2', '石头砖1', '石头砖2', '深色石头砖1', '深色石头砖2', '深色石头砖3', '深色石头砖4', '快递箱', '电视', '书架', '蝙蝠窗户', '红色礼物盒', '蓝色礼物盒', '雪人的上半身', '雪人的下半身', '福字', '民族风窗户', '彩虹', '鞭炮', '工具箱', '宝箱'],
    })
    if (sel2) {
        entity.player.hand = voxel_2[sel2.index];
    }
}

async function voxelSel3_1(entity) {
    const sel3_1 = await entity.player.dialog({
        type: Box3DialogType.SELECT,
        content: "请选择一个方块！",
        options: ['通风管道', '按钮', '风扇', '实验室灯_1', '实验室灯_2', '实验室灯_3', '实验室地板_1', '实验室地板_2', '实验室地板_3', '实验室地板_4', '实验室地板_5', '实验室地板_6', '实验室地板_7', '实验室地板_8', '实验室地板_9', '实验室', '实验灯', '警示线', '警示线_2', '铁丝网_1', '铁丝网_2', '屏幕', '资料架', '蹦床', '传送带']
    })
    if (sel3_1) {
        entity.player.hand = voxel_4[sel3_1.index]
    }
}

async function voxelSel3_2(entity) {
    console.log(1)
    const sel3_2 = await entity.player.dialog({
        type: Box3DialogType.SELECT,
        content: "请选择一个方块！",
        options: ['灯箱_1', '灯箱_2', '宫殿的灯', '红边灯', '动态灯_1', '动态灯_2', '南瓜灯', '星光灯', '雪花灯', '蓝色彩带', '绿色彩带', '红色彩带', "黄色彩带", '实验室灯_1', '实验室灯_2', '实验室灯_3', '红色灯', '橙色灯', '黄色灯', '绿色灯', '蓝色灯', '深蓝色灯', '紫色灯', '粉色灯', '青色灯', '白色灯', '温暖的灯'],
    })
    if (sel3_2) {
        entity.player.hand = voxel_3[sel3_2.index]
    }
}

async function voxelSel3_3(entity) {
    console.log(1)
    const sel3_3 = await entity.player.dialog({
        type: Box3DialogType.SELECT,
        content: "请选择一个方块！",
        options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '+', '-', '×', '÷', '=', '！', '？', '&', '*', '@', '/', '[', ']', '^', ':', ',', '$', '>', '<', '(', ')', '%', '.', '#', '"', ';', '/', '~'],
    })
    if (sel3_3) {
        entity.player.hand = voxel_5[sel3_3.index]
    }
}


async function voxel3_5(entity) {
    const sel3_5 = await entity.player.dialog({
        type: Box3DialogType.SELECT,
        content: "请选择一个方块！",
        options: ['粉色蛋糕', '奶油蛋糕', '巧克力蛋糕', '草莓汁', '酸橙汁', '蓝莓汁', '柠檬汁', '葡萄汁', '橙汁', '牛奶', '酱油', '咖啡', '蜜桃汁', '糖果'],
    })
    if (sel3_5) {
        entity.player.hand = voxel_6[voxel3_5.index];
    }
}

async function voxel3_6(entity) {
    const sel3_6 = await entity.player.dialog({
        type: Box3DialogType.SELECT,
        content: "请选择一个方块！",
        options: ['粉色蛋糕', '奶油蛋糕'],
    })
    if (sel3_6) {
        entity.player.hand = voxel_7[voxel3_6.index];
    }
}
world.onChat(async ({ entity, message }) => {
    switch (message) {
        case '/位置':
            if (!NBplayer.includes(entity.player.name)) return;
            entity.player.directMessage(`管理员 ${entity.player.name} 您所在位置:${entity.position}`);
            break;
        case '/指令帮助':
            if (!NBplayer.includes(entity.player.name)) return;
            {
                entity.player.dialog({
                    type: Box3DialogType.SELECT,
                    content: '/清图 清空地图 \n /旁观者 开启旁观者模式\n /显身 解除旁观者模式\n /广播公告 发布公告\n /开启特效 开启炫酷の特效\n /关闭特效 关闭炫酷の特效\n /传送 传送至某个玩家\n /发光 发出耀眼的光芒\n /不发光 关闭耀眼的光芒\n /变绿 变绿\n /变蓝 变蓝\n /变红 变红\n /变黑 变黑 \n /恢复颜色 去掉颜色\n /位置 显示当前坐标',
                    options: ['懂了懂了'],
                })
            }
            break;
        case '/集中':
            if (!VIP_player.includes(entity.player.name)) return;
            {
                world.querySelectorAll('player').forEach((e) => {
                    e.player.forceRespawn();
                });
                world.say(`[系统]已经集合所有玩家到出生点`);
            }
            break;
        case '/旁观者':
            if (!NBplayer.includes(entity.player.name)) return;
            {
                entity.player.showName = false;
                entity.player.invisible = true;
                entity.player.spectator = true;
                entity.player.directMessage(`${entity.player.name}已开启幽灵模式`);
            }
            break;
        case '/显身':
            if (!NBplayer.includes(entity.player.name)) return;
            {
                entity.player.showName = true;
                entity.player.invisible = false;
                entity.player.spectator = false;
                entity.player.directMessage(`${entity.player.name}已显身`);
            }
            break;
        /*  
          case '/广播公告':
              if (!NBplayer.includes(entity.player.name)) return;
              {
                  await tellAdmin(entity);
              }
              break;
          */
        case '/开启特效':
            if (!NBplayer.includes(entity.player.name)) return;
            {
                Object.assign(entity, {
                    particleLimit: 300,
                    particleLifetime: 5,
                    particleRate: 300,
                    particleRateSpread: 500,
                    particleSize: [5, 3, 5, 3, 5],    //粒子特效
                    particleColor: [
                        new Box3RGBColor(10, 0, 0),
                        new Box3RGBColor(0, 10, 0),
                        new Box3RGBColor(0, 0, 10),
                    ],
                    particleVelocity: new Box3Vector3(0, 0, 0),
                });
                entity.player.directMessage(`${entity.player.name}开启粒子特效！`);
            }
            break;
        case '/关闭特效':
            if (!NBplayer.includes(entity.player.name)) return;
            {
                Object.assign(entity, {
                    particleLimit: null,
                    particleLifetime: null,
                    particleRate: null,
                    particleRateSpread: null,    //粒子特效
                    particleVelocity: new Box3Vector3(null, null, null),
                });
                entity.player.directMessage(`${entity.player.name}关闭粒子特效！`);
            }
            break;
        case '/传送':
            if (!NBplayer.includes(entity.player.name)) return;
            {
                await tpSb(entity);
            }
            break;
        case '/发光':
            if (!NBplayer.includes(entity.player.name)) return;
            {
                entity.player.emissive = 1;
                entity.player.directMessage(`${entity.player.name}变成了光！`);
            }
            break;
        case '/不发光':
            if (!NBplayer.includes(entity.player.name)) return;
            {
                entity.player.emissive = 0;
                entity.player.directMessage(`${entity.player.name}取消发光！`);
            }
            break;
        case '/变红':
            if (!NBplayer.includes(entity.player.name)) return;
            {
                entity.player.color.set(1, 0, 0);
                entity.player.directMessage(`${entity.player.name}燃 了！`);
            }
            break;
        case '/变绿':
            if (!NBplayer.includes(entity.player.name)) return;
            {
                entity.player.color.set(0, 1, 0);
                entity.player.directMessage(`${entity.player.name}很健康(被原谅了awa)!`);
            }
            break;
        case '/变蓝':
            if (!NBplayer.includes(entity.player.name)) return;
            {
                entity.player.color.set(0, 0, 1);
                entity.player.directMessage(`${entity.player.name}变成了（）？！`);
            }
            break;
        case '/变黑':
            if (!NBplayer.includes(entity.player.name)) return;
            {
                entity.player.color.set(0, 0, 0);
                entity.player.directMessage(`${entity.player.name}黑乎乎的！`);
            }
            break;
        case '/恢复颜色':
            if (!NBplayer.includes(entity.player.name)) return;
            {
                entity.player.color.set(1, 1, 1);
                entity.player.directMessage(`${entity.player.name}又变得正经了！`);
            }
            break;
        case '/变大':
            if (!VIP_player.includes(entity.player.name)) return;
            {
                entity.player.scale += 0.3;
                entity.player.directMessage(`${entity.player.name}变大了！`);
            }
            break;
        case '/变小':
            if (!VIP_player.includes(entity.player.name)) return;
            {
                entity.player.scale -= 0.3;
                entity.player.directMessage(`${entity.player.name}缩小了！`);
            }
            break;
        case '/日出':
            if (!VIP_player.includes(entity.player.name)) return;
            {
                world.sunPhase = 0.2;
                world.say('日出了！')
            }
            break;
        case '/日落':
            if (!VIP_player.includes(entity.player.name)) return;
            {
                world.sunPhase = 0.55;
                world.say('日落了!')
            }
            break;
        case '/天亮':
            if (!VIP_player.includes(entity.player.name)) return;
            {
                world.sunPhase = 0.5
                world.say('天亮了！')
            }
            break;
        case '/天黑':
            if (!VIP_player.includes(entity.player.name)) return;
            {
                world.sunPhase = 1;
                world.say('天黑了！')
            }
            break;
        case '/加速':
            if (!VIP_player.includes(entity.player.name)) return;
            {
                entity.player.runSpeed += 1;
                entity.player.walkSpeed += 1;
                entity.player.directMessage(`${entity.player.name}加速速！`);
            }
            break;
        case '/跳高高':
            if (!VIP_player.includes(entity.player.name)) return;
            {
                entity.player.jumpPower += 1;
                entity.player.directMessage(`${entity.player.name}跳高高！`);
            }
            break;
        case '/减速':
            if (!VIP_player.includes(entity.player.name)) return;
            {
                entity.player.runSpeed -= 1;
                entity.player.walkSpeed -= 1;
                entity.player.directMessage(`${entity.player.name}减速速！`);
            }
            break;
        case '/跳矮矮':
            if (!VIP_player.includes(entity.player.name)) return;
            {
                entity.player.jumpPower -= 1;
                entity.player.directMessage(`${entity.player.name}跳矮矮！`);
            }
            break;
        case '/清图':
            if (!ZUOZHE_NB.includes(entity.player.name)) return;
            {
                for (let i = 0; i <= 254; i++)
                    for (let j = 0; j <= 254; j++)
                        for (let k = 0; k <= 62; k++)
                            if (k == 0) {
                                voxels.setVoxel(i, k, j, 129)
                            }
                            else if (k >= 1 && k <= 7) {
                                voxels.setVoxel(i, k, j, 125)
                            }
                            else if (k == 15) {
                                voxels.setVoxel(i, k, j, 127)
                            }
                            else if (k > 15 && k < 63) {
                                voxels.setVoxel(i, k, j, 0)
                            }
                world.querySelectorAll('player').forEach((e) => {
                    e.player.forceRespawn();
                });
                world.say(`[系统]成功恢复地图`);
            }
            break;

    }
});

async function tpSb(entity) {
    const tpdia = await entity.player.dialog({
        type: Box3DialogType.INPUT,
        content: `传送到谁呢？`,
        placeholder: `让我康康`,
        confirmText: '传送',
    })
    world.querySelectorAll('player').forEach((e) => {
        if (e.player.name == tpdia) {
            entity.position.set(e.position.x, e.position.y, e.position.z)
        }
    });
    entity.player.directMessage(`传送成功！`);
}
/*
async function tellAdmin(entity)
{
    const telladmin = await entity.player.dialog({
        type: Box3DialogType.INPUT,
        content: `发布公告？有大事？（）`,
        placeholder: `公告内容`,
        confirmText: '说！',
    })
    {
      world.querySelectorAll('player').forEach((e)=>{
         e.player.dialog({
            type:Box3DialogType.SELECT,
            content:'管理员 ${entity.player.name} 向所有玩家发出公告:${telladmin}',
            options:['懂了懂了'],
        })
    })

}
*/

const char_table = {
    0: 'zero',
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    '+': 'add',
    '-': 'subtract',
    '?': 'question_mark',
    '!': 'exclamation_mark',
    '=': 'equal',
    ' ': 'black',
    '&': 'ampersand',
    '*': 'asterisk',
    '@': 'at',
    '\\': 'backslash',
    ']': 'bracket_close',
    '[': 'bracket_open',
    '^': 'caret',
    ':': 'colon',
    ',': 'comma',
    '$': 'dollar',
    '>': 'greater_than',
    '<': 'less_than',
    '(': 'paren_open',
    ')': 'paren_close',
    '%': 'percent',
    '.': 'period',
    '#': 'pound',
    '"': 'quotation_mark',
    ';': 'semicolon',
    '/': 'slash',
    '~': 'tilde',
}

// 如果符号在列表内，则放置列表对应名称的方块。否则直接放置字母方块。
function voxelText(str, x, y, z) {
    for (var i = 0; i < str.length; i++) {
        var char = str[i].toUpperCase()
        var name = char_table[char]
        if (name) {
            voxels.setVoxel(x + i, y, z, name)
        } else {
            voxels.setVoxel(x + i, y, z, char)
        }
    }
}

// 在指定的位置，依次生成字符串方块
function Text(words, x, y, z) {
    for (var i = 0; i < words.length; i++) {
        voxelText(words[i], x, y - i, z)
    }
}
// 调用方法
//Text(['HELLO BOX3.0','2333'], 64, 20, 64)

/*

function text(str, x, y, z) {
    str-=32;// 将字母转换为大写
    for(var i = 0; i < str.length; i++){
        var char = str[i]
        voxels.setVoxel(x+i, y, z, char);
    }
}

// 调用方法
//AItext('hello world', 63, 20, 63)
*/
async function ditu(entity) {
    leida = world.querySelector(".雷达")
    zhognxindian = world.querySelector(".中心店")
    nizaizheli = world.createEntity({
        position: entity.position,
        gravity: false,
        collides: false
    })
    nizaizheli.enableInteract = true;
    nizaizheli.interactRadius = 1;
    nizaizheli.interactHint = "你在这里";
    entity.velocity.set(0, 0, 0)
    entity.player.fixPosition = entity.position.add(new Box3Vector3(0, 0, 0))
    entity.player.dialog({
        type: Box3DialogType.SELECT,
        title: "功能菜单",
        content: "正在查看小地图",
        options: ["返回"],
        lookEye: leida,
        lookTarget: zhognxindian,
    })
    while (true) {
        if (!entity.position.equals(entity.player.fixPosition)) {
            nizaizheli.destroy()
            return;
        }
        await sleep(100)
    }
}
world.onChat(({ entity, message }) => {
    if (message.startsWith('$') && VIP_player.includes(entity.player.name)) {
        try {
            entity.player.directMessage('<~' + eval(message.slice(1)))

        } catch (err) {
            entity.player.directMessage(err)
        }
    }
})
require('/信息.js')
