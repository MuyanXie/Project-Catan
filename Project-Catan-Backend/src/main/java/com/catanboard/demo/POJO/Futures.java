package com.catanboard.demo.POJO;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "futures")
public class Futures {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "initiator_id", nullable = false)
    private String initiatorId;

    @Column(name = "acceptor_id", nullable = false)
    private String acceptorId;

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

}
