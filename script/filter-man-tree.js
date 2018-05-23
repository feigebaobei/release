/**
    *@info 构造函数
    *@author: xingzhenli
    *@date 2016-05-07
    *@param treeStruct数据格式---[{"text":"人力行政部","tags":["9666271"],"nodes":[{"text":"行政组","tags":["44295001"]}]},{"text":"师训部","tags":["9666272"]}]
    *@return null
    * */
(function($, window, document, undefined){
	function PersonTree (element, options) {
		this.element = element;
		this.options = $.extend(true,{
			treeStruct: '',//部门结构
			selePerson: ''//已选中的人(seleArr = [[中文名Arr],[英文名Arr]])
		},options);
		this.data.list = {};
		this.init();
	}
	PersonTree.prototype = {
		dom: {
			closeIcon: '.closeBtn',
			checkAllLabel: '.select_person_tit label',
			checkAllInput: ".select_person_tit input[type='checkbox']",
			manList: '.man_info li',//中间区域人员列表项
			seleManList: '.selected_man ul li',//右边区域人员列表项
			delSeleManIcon: '.selected_man .del_selected_man',//右边区域人员删除icon
			confirmBtn: '.sure_add button'//确定按钮
		},
		config: {
			letterArr: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
			colorArr: ['#FFC0CB','#f7b004','#a461b5','#9370DB','#AB82FF','#8EE5EE','#836FFF','#0088A8','#FFDEAD','#65a8e6','#40f9ca','#5F9EA0','#CD5C5C','#FF6A6A','#DDA0DD','#1E90FF','#FF6347','#EEAD0E','#4db14d','#6289aa','#ad8b7b','#edb76c','#6270a3','#65a8e6','#e27a64','#5abe98']
		},
		data:{
			list:{}
		},
		init: function () {
			this.creatHtml();
			this.bindEvent();
		},
		isCheckAll: function () {
			//判断全选按钮状态
			for(var i = 0; i < $(this.dom.manList).length; i ++){
				if (!$(this.dom.manList).eq(i).hasClass('selected')) {
					break;
				};
			}
			if (i === $(this.dom.manList).length && $(this.dom.manList).length != 0) {
				$(".select_person_tit input[type='checkbox']").prop('checked', true);
			}else {
				$(".select_person_tit input[type='checkbox']").prop('checked', false);
			}
		},
		creatHtml: function () {
			var me = this;
			var content = '';
			var selePerson = me.options.selePerson;
			var treeStructure = me.options.treeStruct;
			content += '<div class="cancel_mask" style="display:block;">'
							+'<div class="select_person_box">'
								+'<span class="closeBtn"><img src="/assets/images/close_white.png"></span>'
								+'<div class="select_tit">选人</div>'
								+'<div class="person_area">'
									+'<div class="group_list">'
										+'<div class="select_person_tit">学而思网校</div>'
										+'<div id="treeview"></div>'
									+'</div>'
									+'<div class="man_list">'
										+'<div class="select_person_tit">'
											+'<label style="font-weight: normal;"><input type="checkbox">全选</label>'
											+'<input type="text" style="height: 25px;outline: none;border: 1px solid rgba(0,0,0,0.1);" id="search_text">'
										+'</div>'
										+'<ul class="man_info">'
											
										+'</ul>'
									+'</div>'
									+'<div class="selected_man">'
										+'<div class="select_person_tit">已选择</div>'
										+'<ul class="selected_man_info">';
			if (selePerson.length !== 0) {
				for(var i = 0; i < selePerson[0].length; i ++){
					content += '<li>'
									+'<img src="/assets/images/del.png" class="del_selected_man">'
									+'<a href="javascript:void(0);">'
										+'<span style="background-color:'+ me.config.colorArr[$.inArray(selePerson[1][i].substring(0,1).toLowerCase(),me.config.letterArr)] +';display:inline-block;position:relative;" class="avator">'
											+'<i class="name_icon">'+ selePerson[0][i].substring(selePerson[0][i].length-2, selePerson[0][i].length) +'</i>'
										+'</span>'
										+'<div class="name_area">'
											+'<p class="name name_chinese">'+ selePerson[0][i] +'</p>'
											+'<p class="name name_email">'+ selePerson[1][i] +'</p>';
							if (selePerson.length == 3) {
								content += '<input type="hidden" id="user-id" value="'+ selePerson[2][i] +'">'
							};
							if (selePerson.length == 4) {
								content += '<input type="hidden" id="user-id" value="'+ selePerson[2][i] +'"><input type="hidden" id="group-id" value="'+ selePerson[3][i] +'">'
							};
							content += '</div></a></li>';
				}
			};
			content  += '</ul></div></div>'
							+'<div class="sure_add">'
								+'<button class="">确定</button>'
							+'</div>'
						+'</div>'
					+'</div>';
			$('body').append(content);
			$('#treeview').treeview({
		      	bootstrap2: false, 
		      	showTags: true,
		      	levels: 2,//继承树默认展开的级别
		      	data: treeStructure,
		      	onNodeSelected: function(event, node) {
			        if ('tags' in node) {
			        	$("#search_text").val("");
			            console.log(node['tags'][0]);
			            $.ajax({
					        type: 'get',
					        url: '/user/deptInfo',
					        data: {
					        	depId: node['tags'][0]
					        },
							dataType:'json',
					        success: function(res) {
					        	if (res.data.length != 0){
					        		me.data.list = res;
					        		me.setList(res);

						        }else {
						        	$('.man_list .man_info').html('');
						        }
					        }
						});
			        }
		      	}
		    });
		    $('.list-group .node-treeview').eq(0).click();  
		},
		setList:function(res){
			var me = this;
            var tpl = '';
            for (var i = 0; i < res.data.length; i ++) {
                for (var j = 0; j < $(me.dom.seleManList).length; j ++) {
                    var name_c = $(me.dom.seleManList).eq(j).find('.name_chinese').text();
                    var name_e = $(me.dom.seleManList).eq(j).find('.name_email').text();
                    if (name_c === res.data[i].realname && name_e+'@100tal.com' === res.data[i].email) {
                        break;
                    }
                }
                if (j === $(me.dom.seleManList).length) {
                    tpl += '<li>';
                }else {
                    tpl += '<li class="selected">';
                }
                tpl += '<a href="javascript:void(0);">'
                    + '<span style="background-color:'+ me.config.colorArr[$.inArray(res.data[i].email.substring(0,1).toLowerCase(),me.config.letterArr)] +';display:inline-block;position:relative;" class="avator">'
                    + '<i class="name_icon">'+ res.data[i].realname.substring(res.data[i].realname.length-2, res.data[i].realname.length) +'</i>'
                    +'</span>'
                    +'<span class="right_icon">'
                    +'<img src="/assets/images/selected_icon.png">'
                    +'</span>'
                    +'<div class="name_area">'
                    +'<p class="name name_chinese">'+ res.data[i].realname +'</p>'
                    +'<p class="name name_email">'+ res.data[i].name +'</p>'
                    +'<input type="hidden" id="user-id" value="'+ res.data[i].user_id +'">'
                    +'<input type="hidden" id="group-id" value="'+ res.data[i].group_id +'">'
                    +'</div>'
                    +'</a>'
                    +'</li>';
            }
            $('.man_list .man_info').html(tpl);
            //判断全选按钮状态
            for (var i = 0; i < $(me.dom.manList).length; i ++) {
                if (!$(me.dom.manList).eq(i).hasClass('selected')) {
                    break;
                };
            }
            if (i === $(me.dom.manList).length && $(me.dom.manList).length != 0) {
                $(me.dom.checkAllInput).prop('checked', true);
            }else {
                $(me.dom.checkAllInput).prop('checked', false);
            }
		},
		bindEvent: function () {
			var me = this;
			$("#search_text").on("input",function () {
				this.value = this.value.replace(' ',"");
				if(this.value == "" && undefined != me.data.list.data) {
					me.setList(me.data.list);
					return;
				}else if(this.value == "" || undefined == me.data.list.data) {
					this.value = "";
					return;
				}
				// console.log($(me.dom.manList));
                var re = /[^\u4e00-\u9fa5]/;
                var temp = this.value;
                var str = '';
                var arr = me.data.list.data;
                var item;
                var res = {data:[]};

                for (var s = 0 ;s<this.value.length;s++){
                	str = this.value[s];
                    if(!re.test(str)){
                        for(var i = 0; i<temp.length;i++) {
                            str = temp[i];
                            for(var j = 0 ; j< arr.length ; j++) {
                                // console.log(arr[j],'----');
                                item = arr[j];
                                if(item.realname.indexOf(str) != -1) {
                                    if( res.data.length != 0 ) {
                                        for (var k = 0 ; k < res.data.length ; k++){
                                            if( res.data[k].user_id == item.user_id) {
                                                break;
                                            }else {
                                                res.data.push(item);
                                            }
                                        }
                                    }else {
                                        res.data.push(item);
                                    }
                                }
                            }
                        }
                    }else {
                        res.data = [];
                        for(var j = 0 ; j< arr.length ; j++) {
                            item = arr[j];
                            if(item.name.indexOf(this.value) != -1) {
                                res.data.push(item);
                                console.log(item)
                            }
                        }
                        break;
                    }

				}
                me.setList(res);

            });
			$('body').on('click', me.dom.closeIcon, function () {
				$('.cancel_mask').remove();
			});
			// 点击中间人员区域（选中和取消选择）
			$('.select_person_box').on('click', me.dom.manList, function () {
				console.log('click');
				if ($(this).hasClass('selected')) {
					$(this).removeClass('selected');
					$(".select_person_tit input[type='checkbox']").prop('checked', false);
					var name_chinese = $(this).find('.name_chinese').text();
					var name_email = $(this).find('.name_email').text();
					var name_info = {'name_c': name_chinese, 'name_e': name_email};
					var name_arr = [name_info];
					for (var i = 0; i < name_arr.length; i ++) {
						for (var j = 0; j < $(me.dom.seleManList).length; j ++) {
							var child = $(me.dom.seleManList).eq(j);
							if (name_arr[i].name_c === child.find('.name_chinese').text() && name_arr[i].name_e === child.find('.name_email').text()) {
								$(me.dom.seleManList).eq(j).remove();
							};
						}
					}
				}else {
					$(this).addClass('selected');
					var tpl = '';
					tpl += '<li><img src="/assets/images/del.png" class="del_selected_man">'
							+ $(this).html() +'</li>';
					$('.selected_man ul').append(tpl);
					//判断全选按钮状态
					me.isCheckAll();
				}
			});
			// 点击右边人员区域（取消选择）
			$('.select_person_box').on('click', me.dom.delSeleManIcon, function () {
				for (var i = 0; i < $(me.dom.manList).length; i ++) {
					var child = $(me.dom.manList).eq(i);
					if ($(this).parent().find('.name_chinese').text() === child.find('.name_chinese').text() && $(this).parent().find('.name_email').text() === child.find('.name_email').text()) {
						child.removeClass('selected');
					};
				}
				$(this).parent().remove();
				//判断全选按钮状态
				me.isCheckAll();
			});
			// 全选
			$('.select_person_box').on('click', me.dom.checkAllLabel, function () {
				if($(me.dom.checkAllInput).is(':checked')){
					for (var i = 0; i < $(me.dom.manList).length; i ++) {
						if (!$(me.dom.manList).eq(i).hasClass('selected')) {
							$(me.dom.manList).eq(i).click();
						};
					}
				}else{
					for (var i = 0; i < $(me.dom.manList).length; i ++) {
						if ($(me.dom.manList).eq(i).hasClass('selected')) {
							$(me.dom.manList).eq(i).click();
						};
					}
				}
			});
			// 确定按钮
			$('.select_person_box').on('click', me.dom.confirmBtn, function () {
				var tpl = '';
				// var seleTpl = '';
				for (var j = 0; j < $(me.dom.seleManList).length; j ++) {
					var name_c = $(me.dom.seleManList).eq(j).find('.name_chinese').text();
					var name_e = $(me.dom.seleManList).eq(j).find('.name_email').text();
					var user_id = $(me.dom.seleManList).eq(j).find('#user-id').val();
					var group_id = $(me.dom.seleManList).eq(j).find('#group-id').val();
					// seleTpl += name_c + '+' + name_e + '+' + user_id + ',';
					tpl += '<li>'
								+ $(me.dom.seleManList).eq(j).find('.avator').prop('outerHTML')
								+ '<span class="name_c">'+ name_c +'</span>'
								+ '<span class="name_e">'+ name_e +'</span>'
								+ '<input type="hidden" class="user_id" value="'+ user_id +'">'
								+ '<input type="hidden" class="group_id" value="'+ group_id +'">'
						  +'</li>';
				}
				// seleTpl = seleTpl.substring(0, seleTpl.length - 1);
				tpl += '<li class="add_person_icon">'
							+'<a href="javascript:void(0);">'
			    				+'<img src="/assets/images/add_icon.png" class="add_icon">'
			    				+'<span>添加人</span>'
			    			+'</a>'
			    	   +'</li>';
				me.element.html(tpl);
				$('.cancel_mask').remove();
			});
		}
	};
	$.fn.personTree = function (options) {
		return new PersonTree($(this), options);
	}
})(jQuery, window, document);