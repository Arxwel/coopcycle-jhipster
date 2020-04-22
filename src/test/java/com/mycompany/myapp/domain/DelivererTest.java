package com.mycompany.myapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.mycompany.myapp.web.rest.TestUtil;

public class DelivererTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Deliverer.class);
        Deliverer deliverer1 = new Deliverer();
        deliverer1.setId(1L);
        Deliverer deliverer2 = new Deliverer();
        deliverer2.setId(deliverer1.getId());
        assertThat(deliverer1).isEqualTo(deliverer2);
        deliverer2.setId(2L);
        assertThat(deliverer1).isNotEqualTo(deliverer2);
        deliverer1.setId(null);
        assertThat(deliverer1).isNotEqualTo(deliverer2);
    }
}
