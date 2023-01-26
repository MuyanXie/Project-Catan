package com.catanboard.demo.POJO;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.*;

@Entity
@Table(name = "options")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Options {
    
    /*Futures*/

    @Column(name = "initiator", nullable = false)
    private String initiator;

    @Column(name = "acceptor", nullable =  false)
    private String acceptor;

    @Column(name = "initiator_items", nullable = false)
    private String initiatorItems;
    
    @Column(name = "acceptor_items", nullable = false)
    private String acceptorItems;

    @Column(name = "active_turn", nullable = false)
    private int activeTurn;

    @Column(name = "initiator_collateral", nullable = false)
    private String initiatorCollateral;

    @Column(name = "acceptor_price", nullable = false)
    private String acceptorPrice;

    @Column(name = "status", nullable = false)
    private int status;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

}
