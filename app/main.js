/**
 * @module Главный модуль приложения
 */
define("app/main", ["jquery", "app/game"], function($, Game) {

    // После формирования разметки документа
    $(document).ready(function() {

        /** @type {Object} используемые элементы интерфейса */
        var Int = {
            /** @type {jQuery} целевой контейнер игрового поля */
            $target: $("#map_target"),
            /** @type {jQuery} список выбора алгоритма формирования исходного состояния */
            $control_algo: $("#form_control select[name='algo']"),
            /** @type {jQuery} список возможных периодов */
            $control_period: $("#form_control select[name='period']"),
            /** @type {jQuery} кнопка запуска игры */
            $control_start: $("#form_control button[name='start']"),
            /** @type {jQuery} кнопка остановки игры */
            $control_stop: $("#form_control button[name='stop']"),
            /** @type {jQuery} кнопка сохранения игры */
            $control_save: $("#form_control button[name='save']"),
            /** @type {jQuery} вывод количества шагов */
            $span_steps: $("#form_status span[name='steps']"),
            /** @type {jQuery} вывод текущей популяции */
            $span_cur: $("#form_status span[name='population']"),
            /** @type {jQuery} вывод минимальной популяции */
            $span_min: $("#form_status span[name='pop_min']"),
            /** @type {jQuery} вывод максимальной популяции */
            $span_max: $("#form_status span[name='pop_max']"),
            // методы
            fn: {
                /**
                 * Нормальное представление относительной величины
                 * @param  {number} value значение
                 * @return {number} нормальное представление
                 */
                toPercent: function(value) {
                    return (value * 100).toFixed(1);
                },
                /**
                 * Открыть/закрыть доступ к редактированию параметров и управлению
                 * @param  {Boolean} isenable true/false
                 */
                enableForm: function(isenable) {
                    Int.$control_algo.prop("disabled", !isenable);
                    Int.$control_period.prop("disabled", !isenable);
                    Int.$control_start.prop("disabled", !isenable);
                    Int.$control_stop.prop("disabled", isenable);
                    Int.$control_save.prop("disabled", !isenable);
                }
            }
        };

        /** @type {Game} экземпляр игры */
        var G = new Game(Int.$target, {
            cb_useStatus: function(status) {
                Int.$span_steps.text(status.steps_count);
                Int.$span_cur.text(Int.fn.toPercent(status.lived_cur / status.capacity));
                Int.$span_min.text(Int.fn.toPercent(status.lived_min / status.capacity));
                Int.$span_max.text(Int.fn.toPercent(status.lived_max / status.capacity));
            }
        });

        // Выбор алгоритма и создание новой игры
        Int.$control_algo.change(function(event) {
            var $this = $(this),
                $selected = $this.find(":selected"),
                value = $this.val();
            // получить параметры алгоритмы
            var algo = {
                name: value,
                arg: (function(name) {
                    switch (name) {
                        case "random":
                        case "constant":
                            return $selected.attr("data-arg") -0;
                        case "selection":
                            return JSON.parse($selected.attr("data-arg"));
                        default:
                            return undefined;
                    }
                })(value)
            }
            // создание новой игры
            G.fn.createGame(algo);
        });
        // по умолчанию первый алгоритм
        Int.$control_algo.change();

        // Нажата кнопка запуска игры
        Int.$control_start.click(function(event) {
            Int.fn.enableForm(false);
            G.fn.startGame(Int.$control_period.val());
        });

        // Нажата кнопка остановки игры
        Int.$control_stop.click(function(event) {
            Int.fn.enableForm(true);
            G.fn.stopGame();
        });

        // Нажата кнопка сохранение игры
        Int.$control_save.click(function(event) {
            var gsave = G.fn.saveGame();
            if (gsave.name = prompt("Save current system?", "Unnamed system")) {
                var $option = Int.$control_algo.find("option:contains('" + gsave.name + "')");
                if ($option.length) {
                    if (confirm("System already exists. Replace it?")) {
                        $option.val(gsave.algo_name).attr("data-arg", gsave.set).toggleClass("local", true);
                    }
                }
                else {
                    Int.$control_algo.append("<option class='local' value='" + gsave.algo_name + "' data-arg='" + gsave.set + "'>" + gsave.name + "</option>");
                }
            }
        });

    });

});