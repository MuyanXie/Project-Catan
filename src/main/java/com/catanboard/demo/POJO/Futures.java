package com.catanboard.demo.POJO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "futures")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Futures {
    
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

    @Column(name = "acceptor_collateral", nullable = false)
    private String acceptorCollateral;

    @Column(name = "status", nullable = false)
    private int status;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private String id;

}
