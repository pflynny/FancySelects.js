function SelectDropDown(element, controller) {

    var self = this;
    var body = $("body");
    var source = $(element);
    var selected = source.find("option[selected]");
    var $optGroups = source.find('optgroup');
    var $options;
    var selectMenu = $(document.createElement("div"));
    var selectMenuWrapper = $(document.createElement("div"));
    var selectMenuLink = $(document.createElement("a"));
    var selectMenuArrow = $(document.createElement("span"));
    var selectClass = source.data("select-menu-class");
    var selectTitle = source.data("select-menu-title");

    selectMenu.attr("data-select-js");
    selectMenu.addClass("select-menu");
    selectMenuLink.html(selected.text());
    selectMenuLink.addClass("select-menu__current");
    selectMenuArrow.addClass("arrow-fade");
    selectMenuWrapper.addClass('select-menu__wrapper');
    selectMenuLink.append(selectMenuArrow);
    selectMenu.append(selectMenuLink);
    selectMenu.append(selectMenuWrapper);

    if (selectClass) {
        selectMenu.addClass(selectClass);
    }

    if ($optGroups.length) {
        $optGroups.each(function(index){
            var $this = $(this);
            var $options = $this.find("option");
            var label = $this.attr('label');
            selectMenuWrapper.append(self.createListItems($options, label));
        });
    } else {
        var $options = source.find("option");
        selectMenuWrapper.append(self.createListItems($options));
    }

    if (selectTitle) {
        selectMenuLink.html(selectTitle);
        selectMenuLink.append(selectMenuArrow);
    }

    // DOM insertion!
    source.after(selectMenu);

    this.menu = selectMenuWrapper;
    this.selectMenuContainer = selectMenu;
    this.selectMenuCurrent = selectMenuLink;
    this.$el = source;
    this.el = source[0];
    this.$el.addClass(this.hiddenClass);
    this.selectMenuController(selectMenuLink, selectMenuWrapper);
    this.controller = controller;
}

SelectDropDown.prototype = {
    hiddenClass: "select--hidden",
    createListItems: function(elements, label) {
        // iterate through the select and extract each option and
        // add to the new ul as li elements

        var container = $(document.createElement("div"));
        var list = $(document.createElement("ul"));
        container.addClass('select-menu__list');

        var option;

        if (label) {
            var $title = $(document.createElement("h3"));
            $title.append(label);
            container.append($title);
        }

        for (var i = 0; i < elements.length; i++) {
            option = elements[i];

            var listItem = $(document.createElement("li"));
            var listItemLink = $(document.createElement("a"));
            var listHTML = option.innerHTML;
            var optionValue = option.getAttribute('value');

            if (optionValue !== "") {
                listItemLink.attr('data-value', optionValue);
                listItemLink.append(listHTML);
                listItem.append(listItemLink);
                list.append(listItem);
            }
        }

        container.append(list);
        return container;
    },

    hideMenu: function() {
        this.menu.hide();
        this.isOpen = false;
        $(document).off('click', this.closeMenuIfNotFocused);
        this.selectMenuContainer.removeClass('select-menu--active');
    },

    showMenu: function() {
        this.menu.show();
        this.selectMenuContainer.addClass('select-menu--active');
        this.controller.closeOthers(this);
        this.isOpen = true;
    },

    toggleMenu: function() {
        if (!this.isOpen) {
            this.showMenu();
        }   else {
            this.hideMenu();
        }
    },

    closeMenuIfNotFocused: function(e) {
        var self = this;
        var $clicked = $(e.target);
        var $folks = $clicked.parents();

        for (var i = 0; i < $folks.length; i++) {
            var folk = $folks[i];
            if (folk === self.selectMenuContainer[0]) {
                return;
            }
        }

        if (self.isOpen) {
            self.hideMenu();
        }

    },

    selectMenuController: function(selectMenuLink, selectMenuWrapper){
        var self = this;

        // activate dropdown menu when first item is clicked
        selectMenuLink.click(function(e) {
            self.toggleMenu();
            $(document).on('click', $.proxy(self.closeMenuIfNotFocused, self));
        });

        //update copy when a link is cliked on
        selectMenuWrapper.on("click", function(e) {
                var target = e.originalEvent.target || e.originalEvent.srcElement;
                var $target =  $(target);
                var value = $target.data('value');
                var label = target.innerHTML;

                if (value) {
                    if (self.$currentSelected) {
                        self.$currentSelected.removeClass("select__item--selected");
                    }
                    $target.addClass("select__item--selected");
                    self.$currentSelected = $target;
                    self.updateSelectValue(value, label);
                    self.hideMenu();
                }
            }
        );
    },

    updateSelectValue: function(value, label) {
        this.selectMenuCurrent.html(label);
        this.selectMenuContainer.attr('data-selected', value);
        this.$el.val(value).change();
        this.selectMenuCurrent.append("<span class='arrow-fade'><span>");
    },

    remove: function() {
        this.selectMenuContainer.hide();
        this.$el.removeClass(this.hiddenClass);
    },

    attach: function() {
        this.selectMenuContainer.show();
        this.$el.addClass(this.hiddenClass);
    }
};


/**
 * Controls all the select instances on the page
 * @param selector      A DOM Query selector string
 * @constructor
 */
var SelectDropDownController = function(selector) {
    var $selects;

    if (!selector) {
        selector = this.defaultSelector;
    }

    this.selects = [];
    $selects = $(selector);

    for (var i = 0; i < $selects.length; i++) {
        var el = $selects[i];
        this.selects.push(new SelectDropDown(el, this));
    }

};

SelectDropDownController.prototype = {
    defaultSelector: "[data-select-menu-source]",
    closeOthers: function(selectObj) {
        var selects = this.selects;
        for (var i = 0; i < selects.length; i++) {
            var obj = selects[i];
            if (obj !== selectObj && obj.isOpen) {
                obj.hideMenu();
            }
        }
    },
    showDOMElements: function() {
        var select;
        for (var i = 0; i < this.selects.length; i++) {
            select = this.selects[i];
            select.attach();
        }
    },
    hideDOMElements: function() {
        var select;
        for (var i = 0; i < this.selects.length; i++) {
            select = this.selects[i];
            select.remove();
        }
    }
};


$(document).ready(function() {
    var selects = false;
    selects = new SelectDropDownController();
});
